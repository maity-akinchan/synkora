"use client";
import { useState } from "react";

const teammates = [
  { email: "susan@getstark.co", username: "@susanatstark", role: "Contributor" },
  { email: "franklin@getstark.co", username: "@starkfranklin", role: "Contributor" },
  { email: "maurice@getstark.co", username: "@arshiasharma", role: "Contributor" },
  { email: "e@getstark.co", username: "@em", role: "Contributor" },
  { email: "marie@getstark.co", username: "@nonopa", role: "Admin (You)" },
  { email: "cm@getstark.co", username: "@connorpm", role: "Contributor" },
];

export default function TeamTable() {
  const [members, setMembers] = useState(teammates);

  return (
    <div className="overflow-x-auto bg-[var(--background) border-2 rounded-2xl">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-[var(--background-alt)]">
          <tr className="border-b">
            <th className="py-3 px-4 text-sm font-semibold text-[var(--foreground)]">EMAIL</th>
            <th className="py-3 px-4 text-sm font-semibold text-[var(--foreground)]">USERNAME</th>
            <th className="py-3 px-4 text-sm font-semibold text-[var(--foreground)]">ROLE</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-3 px-4">{m.email}</td>
              <td className="py-3 px-4 text-[var(--secondary)]">{m.username}</td>
              <td className="py-3 px-4">
                <select
                  value={m.role}
                  className="border rounded-md px-2 py-1 text-sm text-[var(--foreground)] bg-[var(--background)]"
                  onChange={(e) => {
                    const updated = [...members];
                    updated[idx].role = e.target.value;
                    setMembers(updated);
                  }}
                >
                  <option>Manager</option>
                  <option>Contributor</option>
                  <option>Viewer</option>
                  <option>Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
