"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const citiesInLebanon = [
  "Beirut",
  "Tripoli",
  "Sidon",
  "Tyre",
  "Nabatieh",
  "Zahle",
  "Jounieh",
  "Baabda",
  "Byblos",
  "Batroun",
  "Baalbek",
  "Akkar",
  "Aley",
];

export default function AddBusinessModal({ isOpen, onClose, onBusinessAdded }) {
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    email: "",
    phone: "",
    country: "Lebanon",
    city: "",
    address: "",
    currency: "LBP",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const required = [
      "businessName",
      "industry",
      "email",
      "country",
      "city",
      "address",
      "currency",
      "adminEmail",
      "adminPassword",
    ];
    for (const field of required) {
      if (!form[field]) {
        alert(`Please fill ${field}`);
        return;
      }
    }
alert("SUBMIT CLICKED!");
console.log("FORM SENDING:", form);


    setLoading(true);

    const res = await fetch("/api/superadmin/businesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    
    setLoading(false);

    if (data.success) {
      onBusinessAdded();
      onClose();
    } else {
      alert("Failed to create business");
      console.error(data.message);
    }
     

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-5 rounded-lg w-[450px] max-h-[90vh] overflow-y-auto space-y-3"
      >
        <h2 className="text-xl font-semibold text-center mb-2">Add Business</h2>

        <input name="businessName" placeholder="Business Name *" value={form.businessName} onChange={handleChange} className="w-full p-2 border rounded" />

        <input name="industry" placeholder="Industry *" value={form.industry} onChange={handleChange} className="w-full p-2 border rounded" />

        <input name="email" placeholder="Email *" type="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />

        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="city" value={form.city} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select City *</option>
          {citiesInLebanon.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input name="address" placeholder="Address *" value={form.address} onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="currency" value={form.currency} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="LBP">LBP</option>
          <option value="USD">USD</option>
        </select>

        <hr />

        <h3 className="font-medium text-sm mb-1">Business Admin</h3>

        <input name="adminName" placeholder="Admin Name (optional)" value={form.adminName} onChange={handleChange} className="w-full p-2 border rounded" />

        <input name="adminEmail" placeholder="Admin Email *" type="email" value={form.adminEmail} onChange={handleChange} className="w-full p-2 border rounded" />

        <input name="adminPassword" placeholder="Admin Password *" type="password" value={form.adminPassword} onChange={handleChange} className="w-full p-2 border rounded" />

        <button disabled={loading} onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-md">
          {loading ? "Saving..." : "Create Business"}
        </button>

        <button onClick={onClose} className="w-full mt-2 text-gray-600 underline text-sm">
          Close
        </button>
      </motion.div>
    </div>
  );
}
