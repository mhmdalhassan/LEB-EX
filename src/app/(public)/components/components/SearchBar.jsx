// src/app/(public)/components/components/SearchBar.jsx
"use client";

export default function SearchBar() {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search for services..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
