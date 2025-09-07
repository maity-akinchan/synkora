// "use client";

// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export default function UserProfilePage() {
//   // Sample user data
//   const user = {
//     name: "Jane Doe",
//     email: "jane.doe@example.com",
//     avatarUrl: "https://i.pravatar.cc/150?img=5",
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-[var(--background)] text-[var(--foreground)] rounded-lg shadow-md">
//       <div className="flex flex-col items-center space-y-4">
//         <Avatar className="w-24 h-24">
//           <AvatarImage src={user.avatarUrl} alt={user.name} />
//           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//         </Avatar>

//         <h1 className="text-2xl font-semibold">{user.name}</h1>
//         <p className="text-sm text-[var(--foreground-alt)]">{user.email}</p>

//         <Button variant="outline" className="mt-4">
//           Edit Profile
//         </Button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import {
  AvatarCard,
  NameCard,
  EmailCard,
  ContactCard,
  SecurityCard,
  //SaveButton,
} from "@/components/user";

export default function UserPage() {
  const [formData, setFormData] = useState({
    name: "Arshia Sharma",
    email: "arshia15854@gmail.com",
    contact: "+91 98765 43210",
    avatar: "https://i.pravatar.cc/150?img=5",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  // const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log("Updated User Data:", formData);
  //   alert("Profile updated successfully!");
  // };

  return (
  <div className="items-center justify-center">
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Avatar Card on top */}
        <AvatarCard
          avatar={formData.avatar}
          handleAvatarChange={handleAvatarChange}
        />

       {/* Other settings below in grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <NameCard name={formData.name} handleChange={handleChange} />
  <EmailCard email={formData.email} handleChange={handleChange} />
  <ContactCard contact={formData.contact} handleChange={handleChange} />
  <SecurityCard />
</div>


</div> 
</div>
</div>

  );
}



