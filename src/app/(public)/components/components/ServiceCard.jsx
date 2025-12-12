// src/app/(public)/components/components/ServiceCard.jsx
"use client";

export default function ServiceCard({ service }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <div className="h-32 mb-3 rounded-lg bg-gray-100" />
      <h3 className="font-semibold">{service.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
    </div>
  );
}
