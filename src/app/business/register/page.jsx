"use client";

import { useState } from "react";

export default function BusinessRegisterPage() {
  const [form, setForm] = useState({
    businessId: "",
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!form.businessId || !form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/business/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Account created successfully! You can now log in.");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Business Admin Registration</h1>
        <p className="text-sm text-gray-500">Create an account for your business dashboard</p>

        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}

        <div className="space-y-3">
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Business ID"
            name="businessId"
            value={form.businessId}
            onChange={handleChange}
          />

          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Register
        </button>
      </div>
    </div>
  );
}
