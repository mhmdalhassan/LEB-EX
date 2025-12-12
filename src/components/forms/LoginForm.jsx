"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  setLoading(true);
  setError("");

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  setLoading(false);

  if (result?.error) {
    setError("Invalid email or password");
    return;
  }

  // Fetch session to get user role
  const sessionRes = await fetch("/api/auth/session");
  const session = await sessionRes.json();

  if (session.user.role === "SUPER_ADMIN") {
    window.location.href = "/superadmin";
  } else if (session.user.role === "BUSINESS_ADMIN") {
    window.location.href = "/business/dashboard";
  } else {
    window.location.href = "/";
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Header Style */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 w-full max-w-md rounded-2xl p-6 text-white shadow-xl mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to LEBEX</h1>
        <p className="text-blue-100 text-sm mt-1">
          Login to access your dashboard
        </p>
      </div>

      {/* Login Box */}
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md border border-gray-100">
        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 p-2 rounded text-sm mb-3">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 bg-gray-50 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 bg-gray-50 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md mt-3 text-sm font-medium hover:bg-indigo-700 transition flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Logging in…
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
