// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginForm() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (res.error) {
//       setError("Invalid credentials");
//       return;
//     }

//     console.log("Login Success! Fetching session...");

//     router.refresh();
//     router.push("/superadmin"); // will be auto-redirected by middleware
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <h2 className="text-2xl font-semibold">Sign in to LEB-EX</h2>

//       {error && <p className="text-red-600">{error}</p>}

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full p-2 border rounded"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full p-2 border rounded"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition">
//         Login
//       </button>
//     </form>
//   );
// }











// leb-ex/src/components/forms/LoginForm.jsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      setError("Invalid email or password");
      return;
    }

    // ✅ Let the server decide where to go (based on role)
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="space-y-1">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full p-2 border rounded text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full p-2 border rounded text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
