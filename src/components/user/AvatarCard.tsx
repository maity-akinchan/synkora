"use client";

interface AvatarCardProps {
  avatar: string;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AvatarCard({ avatar, handleAvatarChange }: AvatarCardProps) {
  return (
    <div className="bg-[var(--background)] rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
      <img src={avatar}  alt="Avatar" className="w-16 h-16 rounded-full border object-cover mb-4"  />
      <label className="cursor-pointer bg-indigo-600 text-[var(--foreground)] px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
        Change Avatar
        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange}/>
      </label>
    </div>
  );
}
