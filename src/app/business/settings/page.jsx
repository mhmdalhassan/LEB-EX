"use client";

import { useState } from "react";
import {
  Building2,
  UploadCloud,
  MapPin,
  Clock,
  BadgeDollarSign,
  Phone,
  Mail,
  Globe,
  Loader2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function BusinessSettingsPage() {
  const [loading, setLoading] = useState(false);

  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    category: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    googleMapUrl: "",
    minPrice: "",
    maxPrice: "",
    openingTime: "",
    closingTime: "",
  });

  const handleChange = (e) => {
    setBusinessInfo({
      ...businessInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Business information saved successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <main className="p-4 lg:p-8 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative z-10 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
              <Building2 size={14} />
              <span>Manage Business Information</span>
            </div>

            <h2 className="text-3xl font-bold">Business Profile Settings</h2>
            <p className="text-blue-100 max-w-xl">
              Update your business details, images, working hours, location, and pricing.
            </p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE – IMAGES */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo Upload */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Logo Upload
              </h3>

              <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="text-gray-400 text-sm">No logo uploaded</div>
              </div>

              <label className="mt-4 flex items-center justify-center gap-2 cursor-pointer bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition">
                <UploadCloud size={18} />
                <span>Upload Logo</span>
                <input type="file" className="hidden" />
              </label>
            </div>

            {/* Cover Image Upload */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cover Image
              </h3>

              <div className="w-full aspect-[3/1] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="text-gray-400 text-sm">No cover image uploaded</div>
              </div>

              <label className="mt-4 flex items-center justify-center gap-2 cursor-pointer bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition">
                <UploadCloud size={18} />
                <span>Upload Cover</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* RIGHT SIDE – FORMS */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Business Name" name="name" value={businessInfo.name} onChange={handleChange} />
                <InputField label="Category" name="category" value={businessInfo.category} onChange={handleChange} />
              </div>

              <InputField label="Description" name="description" textarea value={businessInfo.description} onChange={handleChange} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <InputField label="Phone Number" name="phone" icon={<Phone size={16} />} value={businessInfo.phone} onChange={handleChange} />
                <InputField label="Email" name="email" icon={<Mail size={16} />} value={businessInfo.email} onChange={handleChange} />
                <InputField label="Website" name="website" icon={<Globe size={16} />} value={businessInfo.website} onChange={handleChange} />
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Location Details
              </h3>

              <InputField label="Full Address" name="address" icon={<MapPin size={16} />} value={businessInfo.address} onChange={handleChange} />

              <InputField label="Google Maps URL" name="googleMapUrl" value={businessInfo.googleMapUrl} onChange={handleChange} />
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Working Hours
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Opening Time" name="openingTime" type="time" icon={<Clock size={16} />} value={businessInfo.openingTime} onChange={handleChange} />
                <InputField label="Closing Time" name="closingTime" type="time" icon={<Clock size={16} />} value={businessInfo.closingTime} onChange={handleChange} />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Service Pricing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Minimum Price" name="minPrice" icon={<BadgeDollarSign size={16} />} value={businessInfo.minPrice} onChange={handleChange} />
                <InputField label="Maximum Price" name="maxPrice" icon={<BadgeDollarSign size={16} />} value={businessInfo.maxPrice} onChange={handleChange} />
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 px-8 py-3 rounded-xl text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-md hover:shadow-lg disabled:bg-blue-400"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Input Field Component
function InputField({ label, name, value, onChange, icon, textarea, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-700">{label}</label>

      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={3}
            className="w-full bg-gray-100 text-gray-800 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full bg-gray-100 text-gray-800 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              icon ? "pl-10" : ""
            }`}
          />
        )}
      </div>
    </div>
  );
}
