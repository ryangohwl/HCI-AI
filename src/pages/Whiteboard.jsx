import React from "react";
import { Tldraw } from "@tldraw/tldraw";
import MyChatBot from "../components/chatbot/llm";
import components from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
import "../hideToolbar.css"; // Import the CSS file with the correct path

function Whiteboard() {
  return (
    <>
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw persistenceKey="Save-Whiteboard" components={components}>
          <GetSelectedTexts />
        </Tldraw>
      </div>
      <div className="chatbot">
        <MyChatBot />
      </div>
    </>
  );
}

export default Whiteboard;
