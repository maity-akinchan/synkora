"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const teammates = [
  { email: "susan@getstark.co", username: "@susanatstark", role: "Contributor" },
  { email: "franklin@getstark.co", username: "@starkfranklin", role: "Contributor" },
  { email: "maurice@getstark.co", username: "@arshiasharma", role: "Contributor" },
  { email: "e@getstark.co", username: "@em", role: "Contributor" },
  { email: "marie@getstark.co", username: "@nonopa", role: "Admin (You)" },
  { email: "cm@getstark.co", username: "@connorpm", role: "Contributor" },
];

export default function ManageTeam() {
  const [members, setMembers] = useState(teammates);
  const [isOpen, setIsOpen] = useState(true); //sidebar toggle

  return (
    <div className="flex h-screen bg-[#E6F2EF]">
      
      <aside
        className={`${
          isOpen ? "w-64" : "w-0"
        } bg-white shadow-md flex flex-col transition-all duration-300 overflow-hidden`}
      >
       
        <div className="flex items-center justify-between px-4 py-4 border-b">
          {isOpen && <h2 className="font-semibold text-lg">Synkora</h2>}
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        
        {isOpen && (
          <nav className="flex-1 px-2 space-y-2 mt-2">
            <a
              href="#"
              className="block px-4 py-2 rounded-md font-medium text-indigo-600 bg-indigo-100"
            >
              Manage team
            </a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
              Team billing
            </a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
              Settings
            </a>
            <hr className="my-2" />
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
              Home
            </a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
              Get Support
            </a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
              Log out
            </a>
          </nav>
        )}
      </aside>

  
      {!isOpen && (
        <button
          className="absolute top-4 left-4 p-2 rounded-md bg-white shadow hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      
      <main className="flex-1 bg-white m-6 rounded-xl shadow p-6 ml-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm font-bold text-indigo-600 pt-2">Team Name</p>
            <h1 className="text-2xl font-bold">Manage team</h1>
          </div>
          <button className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700">
            Add Teammates
          </button>
        </div>

        
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
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
      </main>
    </div>
  );
}
