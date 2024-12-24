// A client component
"use client";

/* From third-party libraries */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* Custom Components */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/* Server Actions */
import { signInAction } from "@/actions/auth-actions";

/**
 * The form schema validation schema.
 */
const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(32, {
      message: "Password must be at most 32 characters",
    }),
});

/**
 * SigninForm component renders a sign-in form with email and password fields.
 * Utilizes react-hook-form for form state management and validation with Zod.
 * On form submission, the input values are logged to the console.
 */
const SigninForm: React.FC<{ authorized: (status: boolean) => void }> = ({
  authorized,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "arashmad.dev@gmail.com",
      password: "12345678",
    },
  });

  /**
   * Handles form submission.
   * This function is triggered when the form is submitted. It takes the form data,
   * retrieves the email and password, and calls the sign-in action.
   *
   * @param formData - The validated values from the form input fields.
   */
  async function onSubmit(formData: z.infer<typeof formSchema>) {
    const result = await signInAction(formData);
    if ("message" in result) {
      form.setError("root.apiError", { message: result.message });
      return;
    }
    authorized("user" in result ? true : false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>Your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>

        {form.formState.errors.root?.apiError && (
          <div className="flex justify-center text-red-500 text-sm italic">
            {form.formState.errors.root?.apiError.message ||
              "Unknown Error by UI"}
          </div>
        )}
      </form>
    </Form>
  );
};

export default SigninForm;
