"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImagePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (markdown: string) => void;
}

export default function ImagePopup ({
  open,
  onOpenChange,
  onInsert,
}: ImagePopupProps) {
  const [url, setUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageMarkdown = `![${file.name}](${reader.result})`;
        onInsert(imageMarkdown);
        onOpenChange(false);
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleUrlInsert = () => {
    if (url.trim() !== "") {
      const imageMarkdown = `![Alt text](${url.trim()})`;
      onInsert(imageMarkdown);
      setUrl("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload from device */}
          <div>
            <p className="text-sm mb-2 font-medium">Upload from your device</p>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Insert via URL */}
          <div>
            <p className="text-sm mb-2 font-medium">Insert from URL</p>
            <Input
              placeholder="https://example.com/image.png"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              onClick={handleUrlInsert}
              className="mt-2 w-full"
              disabled={!url.trim()}
            >
              Insert Image
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
