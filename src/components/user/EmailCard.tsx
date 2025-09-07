"use client";

interface EmailCardProps {
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailCard({ email, handleChange }: EmailCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input type="email"  name="email"  value={email} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"/>
    </div>
  );
}
