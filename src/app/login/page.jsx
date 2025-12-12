"use client";

import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Login to your Dashboard
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
