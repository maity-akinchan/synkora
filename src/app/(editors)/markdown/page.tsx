"use client";
import React, { useState, useRef } from "react";
import MarkdownComponent from "./_components/MarkdownComponent";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

// Replaced FontAwesome icons with simple text/buttons for toolbar to reduce dependency

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { RobotPopup } from "./_components/PopUp";
import ImagePopup from "./_components/PopImage";


export default function Page() {
  const initText = `
# Hello World

This is **bold text** and this is a [link](https://example.com).
  `;
  const aceEditorRef = useRef<AceEditor | null>(null);

  const [mdText, setMdText] = useState(initText);
  const [fontSize, setFontSize] = useState(14);

  const handleTextToggle = (bounding: String, bs: number) => {
    // Example for parameters: bounding is `**`
    // and bs (bounding size | no of bounding chars) is 2 for bold
    const bounder = bounding;
    if (aceEditorRef.current) {
      const editor = aceEditorRef.current.editor;
      const selectionRange = editor.getSelectionRange();
      const selectedText = editor.session.getTextRange(selectionRange);

      if (selectedText.trim()) {
        if (selectedText.slice(0,bs) == bounding) {
          const newText = selectedText.slice(bs,selectedText.length-bs);
          editor.session.replace(selectionRange, newText);
          setMdText(editor.getValue()); // Update state
        }
        else {
          const newText = `${bounding}${selectedText.trim()}${bounding}`;
          editor.session.replace(selectionRange, newText);
          setMdText(editor.getValue()); // Update state
        }
      }
    }
  };
  const handleEditorChange = (newValue: any) => {
    if (aceEditorRef.current) {
      const editor = aceEditorRef.current.editor;
      editor.setFontSize(16)
      setMdText(newValue || initText);

      // // Get current line information
      // const currentLineNumber = editor.getSelectionRange().start.row;
      // const currentLineText = editor.session.getLine(currentLineNumber);
      // console.log('Current Line Number:', currentLineNumber + 1); // +1 for 1-indexed display
      // console.log('Current Line Text:', currentLineText);
    }
  };  


const insertMarkdownAtCursor = (text: string) => {
  // aceEditorRef.current?.editor.insert(text); 
   if (aceEditorRef.current) {
      aceEditorRef.current.editor.insert(text);
      setMdText(aceEditorRef.current.editor.getValue());
    }

};
const [showImagePopup, setShowImagePopup] = useState(false);



  return (
    //top navbar
    <div className="flex flex-col w-full">
      <nav className="flex gap-8 justify-center items-center bg-black/90 text-white py-2">
        <h1 className="text-xl font-bold">Synkora</h1>
      </nav>

      <div className="h-screen flex">

        <ResizablePanelGroup
          direction="horizontal"
          className="flex w-full h-screen border-gray-300"
        >
          <ResizablePanel id="code-panel" className="border-2 border-gray-800" defaultSize={50} minSize={40}>
            <div className="flex gap-8 items-center py-2 justify-center bg-black/90 text-white">
              <button aria-label="Bold" title="Bold" className="hover:text-gray-500 hover:cursor-pointer text-sm" onClick={() => handleTextToggle("**", 2)}>B</button>
              <button aria-label="Italic" title="Italic" className="hover:text-gray-500 hover:cursor-pointer text-sm" onClick={() => handleTextToggle("*", 1)}>I</button>
              <button aria-label="Strikethrough" title="Strikethrough" className="hover:text-gray-500 hover:cursor-pointer text-sm" onClick={() => handleTextToggle("~", 1)}>S</button>
              <button aria-label="Insert Image" title="Insert Image" className="hover:text-gray-500 hover:cursor-pointer text-sm" onClick={() => setShowImagePopup(true)}>Image</button>
               <ImagePopup
            open={showImagePopup}
            onOpenChange={setShowImagePopup}
            onInsert={insertMarkdownAtCursor}
                />


              <i className="text-gray-600">|</i>
              <button aria-label="Increase Font" title="Increase Font" className="hover:text-gray-500 hover:cursor-pointer text-sm" onClick={() => setFontSize((size) => size + 1)}>+</button>
              <button aria-label="Decrease Font" title="Decrease Font" className="hover:text-gray-500 hover:cursor-pointer text-sm" onClick={() => setFontSize((size) => Math.max(8, size - 1))}>-</button>
            </div>

            <AceEditor
              ref={aceEditorRef}
              mode="markdown"
              height="100%"
              width="100%"
              value={mdText} // Controlled editor
              theme="tomorrow_night"
              onChange={handleEditorChange}
               fontSize={fontSize} 
              name="code-panel"
              editorProps={{ $blockScrolling: true }}

             
              // onCopy={(e) => {console.log(e)}}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="border-2 border-gray-800" defaultSize={50} maxSize={60} minSize={40}>
            <div className="flex gap-8 items-center py-2 px-4 justify-end bg-black/90 text-white">
              <RobotPopup setMarkdown={setMdText}></RobotPopup>
              <button aria-label="Export PDF" title="Export PDF" className="hover:text-gray-500 hover:cursor-pointer">PDF</button>
            </div>
            
            {/* <div className="p-10 overflow-auto h-[90%]">
              <MarkdownComponent content={mdText} />
            </div> */}

            <div
              className="p-10 overflow-auto h-[90%]"
              style={{ fontSize: fontSize }}
            >
              <MarkdownComponent content={mdText} />
            </div>

          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

    </div>

  );
}

