"use client";
import Link from "next/link";

export default function BusinessSidebar() {
  return (
    <aside className="w-64 bg-black text-white p-5 space-y-4">
      <Link href="/business" className="block hover:bg-gray-800 p-2 rounded">
        Dashboard
      </Link>
      <Link href="/business/staff" className="block hover:bg-gray-800 p-2 rounded">
        Staff
      </Link>
      <Link href="/business/products" className="block hover:bg-gray-800 p-2 rounded">
        Products
      </Link>
      <Link href="/business/orders" className="block hover:bg-gray-800 p-2 rounded">
        Orders
      </Link>
      <Link href="/business/settings" className="block hover:bg-gray-800 p-2 rounded">
        Settings
      </Link>
    </aside>
  );
}
