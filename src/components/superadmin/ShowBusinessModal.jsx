"use client";
import { X } from "lucide-react";

export default function ShowBusinessModal({ open, business, onClose }) {
  if (!open || !business) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
        
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{business.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <p><strong>Email:</strong> {business.email}</p>
          <p><strong>Phone:</strong> {business.phone || "-"}</p>
          <p><strong>City:</strong> {business.city || "-"}</p>
          <p><strong>Country:</strong> {business.country || "-"}</p>
          <p><strong>Address:</strong> {business.address || "-"}</p>
          <p><strong>Industry:</strong> {business.industry || "-"}</p>
          <p><strong>Currency:</strong> {business.currency}</p>
          <p><strong>Plan:</strong> {business.subscriptionPlan}</p>
          <p><strong>Status:</strong> {business.active ? "Active" : "Suspended"}</p>
        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded text-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
