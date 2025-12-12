"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center backdrop-blur-xl bg-white/40 border-b border-white/20">
      
      <h1 className="text-xl font-bold tracking-tight">
        LEB-EX Marketplace
      </h1>

      <button
        className="md:hidden p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={26} />
      </button>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <a href="/" className="hover:text-indigo-600 transition">Home</a>
        <a href="/services" className="hover:text-indigo-600 transition">Services</a>
        <a href="/categories" className="hover:text-indigo-600 transition">Categories</a>
        <a href="/contact" className="hover:text-indigo-600 transition">Contact</a>
      </nav>

    </header>
  );
}
