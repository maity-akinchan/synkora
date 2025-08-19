"use client";

import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Button } from "@/components/ui/button";
import ImagePopup from "./PopImage"; 

export default function MarkdownEditor() {
  const [content, setContent] = useState("");
  const [showImagePopup, setShowImagePopup] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdownAtCursor = (markdown: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const before = content.substring(0, start);
    const after = content.substring(end);
    const newContent = before + markdown + after;
    setContent(newContent);
  };

  return (
    <div className="flex gap-4">
     
      <div className="w-1/2">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[500px] p-2 border rounded"
        />
        <div className="mt-2 flex gap-2">
          <Button onClick={() => setShowImagePopup(true)}>
            Add Image
          </Button>
        </div>
      </div>

     
      <div className="w-1/2 border rounded p-2 overflow-auto">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>

      
      <ImagePopup
        open={showImagePopup}
        onOpenChange={setShowImagePopup}
        onInsert={(markdown) => insertMarkdownAtCursor(markdown)}
      />
    </div>
  );
}
