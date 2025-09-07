"use client";

interface SaveButtonProps {
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export default function SaveButton({ handleSubmit }: SaveButtonProps) {
  return (
    <div className="md:col-span-3 bg-[var(--background)]/90 rounded-2xl shadow-lg p-6 flex justify-end">
      <button  onClick={handleSubmit} className="bg-indigo-600 text-[var(--foreground)] px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
        Save Changes
      </button>
    </div>
  );
}
