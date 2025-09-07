"use client";

interface ContactCardProps {
  contact: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactCard({ contact, handleChange }: ContactCardProps) {
  return (
    <div className="bg-[var(--background)]/90 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
      <label className="block text-sm font-medium text-[var(--foreground-alt)]">Contact</label>
      <input  type="text" name="contact"  value={contact}  onChange={handleChange} className="mt-2 text-[var(--foreground-alt)] block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2" />
    </div>
  );
}
