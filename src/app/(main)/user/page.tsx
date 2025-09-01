"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfilePage() {
  // Sample user data
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[var(--background)] text-[var(--foreground)] rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-sm text-[var(--foreground-alt)]">{user.email}</p>

        <Button variant="outline" className="mt-4">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
