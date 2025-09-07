"use client";

export default function SecurityCard() {
  return (
    <div className="bg-[var(--background)] rounded-2xl shadow-lg p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-[var(--secondary)] mb-2">Security</h3>
      <button className="bg-red-500 text-[var(--foreground)] px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition mb-2">
        Change Password
      </button>
      <button className="bg-gray-800 text-[var(--foreground-alt)] px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
        Enable 2FA
      </button>
    </div>
  );
}
