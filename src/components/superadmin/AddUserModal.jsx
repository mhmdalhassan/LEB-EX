"use client";
import { useState } from "react";

export default function AddUserModal({ open, onClose, businessId, onCreated }) {
  if (!open) return null;

  const [form, setForm] = useState({
    email: "",
    role: "CASHIER",
  });

  const handleSubmit = async () => {
    const res = await fetch(`/api/superadmin/businesses/${businessId}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!data.success) return alert(data.message);

    onClose();
    onCreated();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[350px] space-y-3">
        <h3 className="font-semibold">Add User</h3>

        <input
          className="border p-2 rounded w-full"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          className="border p-2 rounded w-full"
          name="role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="BUSINESS_ADMIN">Business Admin</option>
          <option value="ACCOUNTANT">Accountant</option>
          <option value="STOREKEEPER">Storekeeper</option>
          <option value="CASHIER">Cashier</option>
          <option value="DELIVERY">Delivery</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-black text-white w-full p-2 rounded"
        >
          Add
        </button>

        <button onClick={onClose} className="text-gray-600 underline w-full">
          Cancel
        </button>
      </div>
    </div>
  );
}
