"use client";
import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";

import "@excalidraw/excalidraw/index.css";

const ExcalidrawWrapper: React.FC = () => {
  return (
    <div style={{height:"100vh", width:"100vw"}}>
      <Excalidraw />
    </div>
  );
};
export default ExcalidrawWrapper;