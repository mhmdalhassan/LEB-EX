// src/app/(public)/components/components/Categories.jsx
"use client";

const demoCategories = ["Home Services", "Electronics", "Cars", "Food", "Beauty"];

export default function Categories() {
  return (
    <div className="flex flex-wrap gap-3">
      {demoCategories.map((cat) => (
        <button
          key={cat}
          className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
