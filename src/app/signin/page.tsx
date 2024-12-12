"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

/* Custom Components */
import SigninForm from "@/components/Form/SigninForm";

export default function SinginPage() {
  const router = useRouter();

  const onNavigateTo = (status: boolean) => {
    debugger;
    if (status) {
      router.push("/map");
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image
        src="/images/landing_page3.jpg"
        alt="Landing Page"
        fill
        className="object-cover"
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center bg-black/10">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg">
          <SigninForm authorized={onNavigateTo} />
        </div>
      </div>
    </div>
  );
}
