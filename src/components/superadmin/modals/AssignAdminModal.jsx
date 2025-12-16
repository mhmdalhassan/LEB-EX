"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AssignAdminModal({ open, business, onClose, onSaved }) {
  if (!open || !business) return null;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAssign = async () => {
    if (!email) {
      setError("Admin email is required");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/superadmin/assign-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId: business.id,
        email,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (!data.success) {
      setError(data.message || "Failed to assign admin");
      return;
    }

    if (onSaved) onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">
            Assign Admin – {business.name}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={18} />
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>
        )}

        {/* Email Input */}
        <div>
          <label className="text-xs font-medium text-gray-600">
            Admin Email
          </label>
          <input
            type="email"
            className="w-full border rounded p-2 mt-1 text-sm"
            placeholder="admin@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={loading}
            className="px-4 py-2 text-sm bg-black text-white rounded"
          >
            {loading ? "Assigning..." : "Assign Admin"}
          </button>
        </div>
      </div>
    </div>
  );
}
