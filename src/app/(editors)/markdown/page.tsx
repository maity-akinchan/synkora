"use client";
import React, { useState, useRef } from "react";
import MarkdownComponent from "./_components/MarkdownComponent";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faStrikethrough, faImage, faPlus, faMinus, faFilePdf, faRobot } from "@fortawesome/free-solid-svg-icons";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { RobotPopup } from "./_components/PopUp";

export default function Page() {
  const initText = `
# Hello World

This is **bold text** and this is a [link](https://example.com).
  `;
  const aceEditorRef = useRef<AceEditor | null>(null);
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
  const [mdText, setMdText] = useState(initText);
  const addImageToCode = () => {
  
  }
  return (
    <div className="flex flex-col">
      <nav className="flex gap-8 justify-center items-center bg-black/90 text-white py-2">
        <h1 className="text-xl font-bold">Synchora</h1>
        <p>This</p>
        <p>That</p>
        <p>These</p>
        <p>Those</p>
      </nav>
      <div className="h-screen flex">
        <nav className="bg-black/90 text-white flex flex-col gap-10 px-2 py-10">
          <p>This</p>
          <p>That</p>
          <p>These</p>
          <p>Those</p>
        </nav>
        <ResizablePanelGroup
          direction="horizontal"
          className="flex w-full h-screen border-gray-300"
        >
          <ResizablePanel id="code-panel" className="border-2 border-gray-800" defaultSize={50} minSize={40}>
            <div className="flex gap-8 items-center py-2 justify-center bg-black/90 text-white">
              <FontAwesomeIcon className="hover:text-gray-500 hover:cursor-pointer text-sm" icon={faBold} onClick={() => handleTextToggle("**", 2)}/>
              <FontAwesomeIcon className="hover:text-gray-500 hover:cursor-pointer text-sm" icon={faItalic} onClick={() => handleTextToggle("*", 1)} />
              <FontAwesomeIcon className="hover:text-gray-500 hover:cursor-pointer text-sm" icon={faStrikethrough} onClick={() => handleTextToggle("~", 1)} />
              <FontAwesomeIcon className="hover:text-gray-500 hover:cursor-pointer text-sm" icon={faImage} onClick={addImageToCode} />
              <i className="text-gray-600">|</i>
              <FontAwesomeIcon className="hover:text-gray-500 hover:cursor-pointer text-sm" icon={faPlus} />
              <FontAwesomeIcon className="hover:text-gray-500 hover:cursor-pointer text-sm" icon={faMinus} />
            </div>
            <AceEditor
              ref={aceEditorRef}
              mode="markdown"
              height="100%"
              width="100%"
              value={mdText} // Controlled editor
              theme="tomorrow_night"
              onChange={handleEditorChange}
              // onCopy={(e) => {console.log(e)}}
              name="code-panel"
              editorProps={{ $blockScrolling: true }}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="border-2 border-gray-800" defaultSize={50} maxSize={60} minSize={40}>
            <div className="flex gap-8 items-center py-2 px-4 justify-end bg-black/90 text-white">
              <RobotPopup setMarkdown={setMdText}></RobotPopup>
              <FontAwesomeIcon className="hover:text-gray-500 hover:cursor-pointer" icon={faFilePdf} />
            </div>
            <div className="p-10 overflow-auto h-[90%]">
              <MarkdownComponent content={mdText} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

    </div>

  );
}
