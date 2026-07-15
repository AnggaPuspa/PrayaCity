import { LoginForm } from "./login-form";

export function LoginView() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 flex justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
