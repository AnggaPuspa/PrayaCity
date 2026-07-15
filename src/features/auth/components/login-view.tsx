import { LoginForm } from "./login-form";
import Image from "next/image";

export function LoginView() {
  return (
    <main className="min-h-screen flex w-full">
      {/* Left Column */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#f4f7fa] relative flex-col justify-center items-center">
        {/* Logo */}
        <div className="absolute top-8 left-10 flex items-center gap-0">
          <Image
            src="/Desain%20tanpa%20judul%20(3).svg"
            alt="Praya City Logo"
            width={64}
            height={64}
            className="object-contain"
          />
          <span className="text-[28px] font-bold text-[#0f172a] tracking-tight leading-none mt-1 -ml-3">rayaCity</span>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-2xl px-12 relative flex justify-center mt-10">
          <Image
            src="/svg-export-1x.png"
            alt="Login Illustration"
            width={800}
            height={600}
            className="w-full max-w-[600px] h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-white p-8 sm:p-12">
        <LoginForm />
      </div>
    </main>
  );
}
