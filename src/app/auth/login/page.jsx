// leb-ex/src/app/auth/login/page.jsx
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md p-8 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-2 text-center">LEB-EX Admin</h1>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Sign in with your business admin or super admin account.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
