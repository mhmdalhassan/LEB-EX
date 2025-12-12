"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditBusinessModal({ open, business, onClose, onSaved }) {
  if (!open || !business) return null;

  const [form, setForm] = useState(business);
  const [loading, setLoading] = useState(false);

  useEffect(() => setForm(business), [business]);

  const handleSave = async () => {
    setLoading(true);

    const res = await fetch(`/api/superadmin/businesses/${business.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    if (!res.ok) return alert("Update failed");

    onSaved && onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl space-y-4">
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg">Edit Business</h2>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        <input className="border p-2 w-full"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input className="border p-2 w-full"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />

        <input className="border p-2 w-full"
          value={form.phone}
          onChange={(e) => setForm({...form, phone: e.target.value})}
        />

        <button
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
          onClick={handleSave}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
