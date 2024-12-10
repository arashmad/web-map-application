import Image from "next/image";

import SigninForm from "@/components/Form/SigninForm";

export default function SinginPage() {
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
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
