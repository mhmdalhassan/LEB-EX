import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="p-8 bg-white shadow rounded w-[400px]">
        <LoginForm />
      </div>
    </main>
  );
}
