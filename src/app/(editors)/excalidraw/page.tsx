"use client";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);
export default function App() {
  return (<div style={{ height: "100vh" }} className="flex"> {/* Ensure the container has a defined height */}
      <div className="p-4 w-30 bg-[#121212] b-[var(--primary)] border-2">
            Synkora
      </div>
      <Excalidraw>
        {/* Optional: Display a welcome screen when the canvas is empty */}
      </Excalidraw>
  </div>)
}