"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function AddBusinessModal({ isOpen, onClose, onBusinessAdded }) {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    industry: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    currency: "LBP",

    // Admin Fields
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.adminEmail.trim() ||
      !form.adminPassword.trim()
    ) {
      setError("Business name, email, admin email & password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/superadmin/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Error creating business");
        setLoading(false);
        return;
      }

      if (onBusinessAdded) onBusinessAdded();

      window.location.href = `/superadmin/businesses/${data.business.id}/users`;

    } catch (err) {
      console.error("Add Business Error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 space-y-4">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Add New Business</h2>
            <p className="text-xs text-gray-500 mt-1">
              Create a business and assign its administrator.
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

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Column 1 */}
          <div className="space-y-3">
            {[
              { label: "Business Name *", name: "name", placeholder: "Café Beirut" },
              { label: "Email *", name: "email", type: "email", placeholder: "business@email.com" },
              { label: "Industry", name: "industry", placeholder: "Restaurant / Coffee Shop" },

              { label: "Admin Name *", name: "adminName", placeholder: "Admin Full Name" },
              { label: "Admin Email *", name: "adminEmail", type: "email", placeholder: "admin@email.com" },
              { label: "Admin Password *", name: "adminPassword", type: "password", placeholder: "********" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
                  required={field.label.includes("*")}
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+961 ..."
                className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Country", name: "country", placeholder: "Lebanon" },
                { label: "City", name: "city", placeholder: "Beirut" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-medium text-gray-700">{field.label}</label>
                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street, building..."
                className="mt-1 border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">Currency</label>
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
            {loading ? "Creating..." : "Create & Manage Users"}
          </button>
        </div>
      </div>
    </div>
  );
}
