"use client";

interface NameCardProps {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NameCard({ name, handleChange }: NameCardProps) {
  return (
    <div className="bg-[var(--background)]/90 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
      <label className="block text-sm font-medium text-[var(--foreground-alt)]">Name</label>
      <input type="text" name="name" value={name} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"/>
    </div>
  );
}
