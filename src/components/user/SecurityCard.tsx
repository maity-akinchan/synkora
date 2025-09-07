"use client";

export default function SecurityCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Security</h3>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition mb-2">
        Change Password
      </button>
      <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
        Enable 2FA
      </button>
    </div>
  );
}
