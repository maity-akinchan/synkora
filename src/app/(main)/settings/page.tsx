"use client";

import { useState } from "react";
import {
    AvatarCard,
    NameCard,
    EmailCard,
    ContactCard,
    SecurityCard,
    UserNameCard
    //SaveButton,
} from "@/components/user";

import {Button} from "@/components/ui/button";
import { backgroundGradientStyle } from "@/lib/commons/styles";
import { TeamSettingsPage } from "@/components/user/team-settings";
export default function Page() {
    const [formData, setFormData] = useState({
        name: "Arshia Sharma",
        username: "arshia1505",
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
        <div className="py-6 min-h-screen font-sans bg-[var(--background)] grid grid-cols-12 gap-8">
            <div className={`p-4 flex gap-4 flex-col h-full rounded-3xl ${backgroundGradientStyle} col-span-8`}>
                <div className="px-4">
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>Team Settings</h1>
                </div>
                <hr />
                <TeamSettingsPage />
            </div>
            <div className={`h-full rounded-3xl ${backgroundGradientStyle} col-span-4 py-8`}>
                <div className="px-4">
                    <h1 className="text-2xl font-semibold mb-2">User Settings</h1>
                    <hr className="mb-6 border-[var(--border)]" />
                </div>
                <div className="w-full max-w-3xl flex flex-col gap-6 scale-95">
                    {/* Avatar Card on top */}
                    <AvatarCard
                        avatar={formData.avatar}
                        handleAvatarChange={handleAvatarChange}
                    />
                    {/* Other settings below in grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs">
                        <span className="grid gap-2">
                            <NameCard name={formData.name} handleChange={handleChange} />
                            <UserNameCard name={formData.username} handleChange={handleChange} />
                        </span>
                        <SecurityCard />
                        <span className="flex flex-col gap-2 lg:col-span-2">
                            <EmailCard email={formData.email} handleChange={handleChange} />
                            <ContactCard contact={formData.contact} handleChange={handleChange} />
                        </span>
                        <Button className="lg:col-span-2 mt-5">Update User</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


