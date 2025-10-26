"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner"

export default function CreatingPage() {
  const [designName, setDesignName] = useState("Untitled Design");
  const [designType, setDesignType] = useState("Unknown");
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [tipOpacity, setTipOpacity] = useState(1);

  const tips = [
    "You can use Markdown shortcuts in Canvas for quick text formatting.",
    "In Spreadsheets, use '=' to start any formula, like '=SUM(A1:A5)'.",
    "Double-click on the Canvas to add a new text node.",
    "Use '##' in Markdown to create a secondary heading.",
    "You can link designs together for a seamless workflow.",
    "Press 'Ctrl+S' or 'Cmd+S' to save your progress at any time.",
    "Right-click on any element in the Canvas to see more options.",
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("design_name") || "Untitled Design";
    const type = params.get("design_type") || "Unknown";
    setDesignName(name);
    setDesignType(type);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipOpacity(0);
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
        setTipOpacity(1);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[var(--background)] flex items-center justify-center min-h-screen text-gray-800 relative">
      <div className="flex flex-col items-center justify-center space-y-6 p-8 rounded-lg text-center">
        <Spinner className="size-34 text-green-500" />

        <h1 className="text-2xl font-semibold text-[var(--foreground)]">
          Hang on, creating your design...
        </h1>

        <p className="text-lg text-[var(--secondary)]">
          <span className="font-medium">{designName}</span>
          <span className="mx-1">&bull;</span>
          <span className="font-medium">{designType}</span>
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full p-8 text-center">
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          <span className="font-semibold text-gray-600">Tip:</span>{" "}
          <span
            style={{
              opacity: tipOpacity,
              transition: "opacity 0.5s ease-in-out",
              display: "inline-block",
            }}
          >
            {tips[currentTipIndex]}
          </span>
        </p>
      </div>
    </div>
  );
}
