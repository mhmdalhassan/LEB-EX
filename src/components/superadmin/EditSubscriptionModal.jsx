"use client";
import { useState } from "react";

export default function EditSubscriptionModal({ open, business, onClose, onSaved }) {
  const [price, setPrice] = useState(business?.subscriptionPrice || 0);

  if (!open || !business) return null;

  const handleSave = async () => {
    const res = await fetch("/api/superadmin/businesses/update-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId: business.id, price }),
    });

    const data = await res.json();

    if (!data.success) return alert(data.message);

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md space-y-3 w-80">
        <h2 className="font-semibold text-lg">Edit Subscription</h2>

        <input
          type="number"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <button className="bg-black text-white w-full p-2 rounded" onClick={handleSave}>
          Save
        </button>

        <button className="text-gray-600 w-full underline" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
