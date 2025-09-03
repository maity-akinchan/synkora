"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[var(--background)] shadow-md">
      {/* Navbar Header */}
      <div className="flex items-center px-4 py-3 border-b">
        {/* Hamburger Toggle replaces Synkora */}
        <button
          className="p-2 rounded-md hover:bg-[var(--primary)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="px-4 py-3 space-y-2">
          <a
            href="#"
            className="block px-4 py-2 rounded-md font-medium bg-[var(--primary)]"
          >
            Manage team
          </a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-[var(--background-alt)]">
            Team billing
          </a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-[var(--background-alt)]">
            Settings
          </a>
        </div>
      )}
    </nav>
  );
}
