"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const cards = [
  { title: "Whiteboard (Excalidraw)", href: "/canvas", desc: "Sketch, diagram, and collaborate" },
  { title: "Markdown Doc", href: "/markdown", desc: "Write docs with live preview" },
  { title: "Spreadsheet", href: "/sheet", desc: "Quick tables & simple formulas" },
];

export default function DesignsHub() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Designs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={`/` + c.href} className="border rounded-xl p-4 bg-[var(--background)] hover:bg-[var(--background-alt)] transition">
            <div className="text-lg font-semibold">{c.title}</div>
            <div className="text-sm opacity-80">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
