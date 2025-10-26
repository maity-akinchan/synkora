"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProjectChat from "@/components/chat/project-chat";

type Sender = {
  id: string;
  name: string | null;
  image?: string | null;
};

export default function ProjectChatModal({
  projectId,
  currentUser,
  variant = "floating",
  buttonText = "Open Chat",
}: {
  projectId: string;
  currentUser: Sender & { id: string };
  variant?: "inline" | "floating";
  buttonText?: string;
}) {
  const triggerBtn = (
    <Button variant="default" className={variant === "floating" ? "shadow-lg" : ""}>
      {buttonText}
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent className="max-w-4xl overflow-hidden p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Project Chat</DialogTitle>
        </DialogHeader>
        <div className="h-[70vh]">
          <ProjectChat projectId={projectId} currentUser={currentUser} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
