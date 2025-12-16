"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditBusinessModal({
  open,
  business,
  onClose,
  onSaved,
}) {
  /* -------------------- State -------------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    industry: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    currency: "LBP",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* -------------------- Sync Business -------------------- */
  useEffect(() => {
    if (!business) return;

    setForm({
      name: business.name || "",
      email: business.email || "",
      industry: business.industry || "",
      phone: business.phone || "",
      country: business.country || "",
      city: business.city || "",
      address: business.address || "",
      currency: business.currency || "LBP",
    });

    setError("");
  }, [business]);

  /* -------------------- Guards -------------------- */
  if (!open || !business) return null;

  /* -------------------- Handlers -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Business name and email are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/superadmin/businesses/${business.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Error updating business");
        setLoading(false);
        return;
      }

      onSaved && onSaved();
      onClose();
    } catch (err) {
      console.error("Edit Business Error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Edit Business</h2>
            <p className="text-xs text-gray-500 mt-1">
              Update business information.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Column 1 */}
          <div className="space-y-3">
            {[
              { label: "Business Name *", name: "name" },
              { label: "Email *", name: "email", type: "email" },
              { label: "Industry", name: "industry" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Country", name: "country" },
                { label: "City", name: "city" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">
                Currency
              </label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/60"
              >
                <option value="LBP">LBP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-900 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
