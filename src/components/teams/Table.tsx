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
    <div className="min-w-screen max-h-screen">
      <table className="min-w-full max-h-screen text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-sm font-semibold text-gray-600">EMAIL</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-600">USERNAME</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-600">ROLE</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-3 px-4">{m.email}</td>
              <td className="py-3 px-4 text-gray-700">{m.username}</td>
              <td className="py-3 px-4">
                <select
                  value={m.role}
                  className="border rounded-md px-2 py-1 text-sm"
                  onChange={(e) => {
                    const updated = [...members];
                    updated[idx].role = e.target.value;
                    setMembers(updated);
                  }}
                >
                  <option>Contributor</option>
                  <option>Admin (You)</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
