"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function RecordPaymentModal({ business, onClose, onSuccess }) {
  const [method, setMethod] = useState("CASH");
  const [period, setPeriod] = useState("MONTHLY");
  const [amount, setAmount] = useState(business.subscriptionPrice || 0);
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    setLoading(true);

    const res = await fetch("/api/superadmin/subscriptions/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId: business.id,
        method,
        period,
        amount: Number(amount),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok || !data.success) {
      alert(data.message || "Payment failed");
      return;
    }

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Record Payment – {business.name}
          </h2>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <select
              className="w-full border rounded-lg p-2"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="CASH">Cash</option>
              <option value="OMT">OMT</option>
              <option value="WISH">Wish</option>
              <option value="BANK">Bank Transfer</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Billing Period</label>
            <select
              className="w-full border rounded-lg p-2"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Record Payment"}
          </button>

        </div>
      </div>
    </div>
  );
}
