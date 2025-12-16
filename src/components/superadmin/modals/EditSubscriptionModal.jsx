"use client";

import { useEffect, useState } from "react";
import { safeFetch } from "@/lib/safeFetch";

export default function EditSubscriptionModal({
  open,
  business,
  onClose,
  onSaved,
}) {
  const [plan, setPlan] = useState("Basic");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("ACTIVE");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CASH");


  useEffect(() => {
    if (business) {
      setPlan(business.subscriptionPlan || "Basic");
      setPrice(business.subscriptionPrice || 0);
      setStatus(business.active ? "ACTIVE" : "SUSPENDED");
      setPaymentMethod(business.defaultPaymentMethod || "CASH");

    }
  }, [business]);

  if (!open || !business) return null;

  const handleSave = async () => {
    setLoading(true);

    const res = await safeFetch(
      `/api/superadmin/businesses/${business.id}/subscription`,
      {
        method: "PUT",
        body: JSON.stringify({
          subscriptionPlan: plan,
          subscriptionPrice: price,
          status,
          defaultPaymentMethod: paymentMethod,
        }),
      }
    );

    setLoading(false);

    if (res?.success) {
      onSaved();
      onClose();
    } else {
      alert(res?.message || "Failed to update subscription");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-bold">Edit Subscription</h2>

        {/* Plan */}
        <div>
          <label className="text-sm font-medium">Plan</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium">Monthly Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>



        {/* Payment Type */}
<div>
  <label className="text-sm font-medium">Payment Type</label>
  <select
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
    className="w-full border rounded px-3 py-2 mt-1"
  >
    <option value="CASH">Cash</option>
    <option value="OMT">OMT</option>
    <option value="WISH">Wish</option>
    <option value="BANK">Bank</option>
    <option value="OTHER">Other</option>
  </select>
</div>


        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
