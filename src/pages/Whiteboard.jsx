import React, { useState } from "react";
import { exportToBlob, Tldraw, useEditor } from 'tldraw'
import MyChatBot from "../components/chatbot/llm";
import CustomContextMenu from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
import GetImageButton from "../components/canvas/GetImageButton";

const components = {
	ContextMenu: CustomContextMenu,
	SharePanel: GetImageButton
  };

function Whiteboard() {
  
	return (
		<>
          <div style={{ position: 'fixed', inset: 0 }}>
            {/* <Tldraw persistenceKey="Save-Whiteboard" components={components}>
              <GetSelectedTexts />
            </Tldraw> */}
            <Tldraw  persistenceKey="my-persistence-key"
			components={components}>
              <GetSelectedTexts />
            </Tldraw>
          </div>
          <div className="chatbot">
            <MyChatBot />
            
          </div>
        </>
	)
}

export default Whiteboard
