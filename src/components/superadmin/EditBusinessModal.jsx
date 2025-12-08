// "use client";
// import { useState } from "react";

// export default function EditBusinessModal({ business, onClose, onUpdated }) {
//   const [form, setForm] = useState({ ...business });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const res = await fetch(`/api/superadmin/businesses/${business.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (!data.success) return alert(data.message);

//     onUpdated();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg w-[400px] space-y-3">
//         <h2 className="text-lg font-bold">Edit Business</h2>

//         {["name", "email", "industry", "phone", "country", "city", "address"].map((field) => (
//           <input
//             key={field}
//             type="text"
//             name={field}
//             placeholder={field}
//             value={form[field] || ""}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           />
//         ))}

//         <select
//           name="currency"
//           value={form.currency}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         >
//           <option value="LBP">LBP</option>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//         </select>

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>

//         <button
//           onClick={onClose}
//           className="text-gray-600 w-full underline"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }






"use client";

import { useState, useEffect } from "react";

export default function EditBusinessModal({ open, business, onClose, onSaved }) {
  // 🛡 Prevent errors before business is selected
  if (!open || !business) return null;

  const [loading, setLoading] = useState(false);

  // Initialize form state from business
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

  // Update form fields when modal opens with a different selected business
  useEffect(() => {
    if (business) {
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
    }
  }, [business]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch(`/api/superadmin/businesses/${business.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) return alert(data.message);

    onSaved();  // Refresh list
    onClose();  // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] space-y-4 animate-fadeIn">
        <h2 className="text-lg font-bold">Edit Business</h2>

        {/* Inputs */}
        {["name", "email", "industry", "phone", "country", "city", "address"].map((field) => (
          <div key={field} className="space-y-1">
            <label className="text-xs uppercase font-medium text-gray-600">
              {field}
            </label>
            <input
              type="text"
              name={field}
              placeholder={field}
              value={form[field] || ""}
              onChange={handleChange}
              className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:ring-black/20"
            />
          </div>
        ))}

        {/* Currency */}
        <div className="space-y-1">
          <label className="text-xs uppercase font-medium text-gray-600">Currency</label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          >
            <option value="LBP">LBP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Buttons */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-900 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={onClose}
          className="text-gray-600 text-sm w-full underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
