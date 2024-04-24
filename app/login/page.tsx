import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36" style={{ backgroundColor: "#fde047" }}>
          <div className="w-32 md:w-36" style={{ color: "black" }}>
            OAG
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}