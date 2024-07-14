import React, { useState } from "react";
import { Tldraw } from "tldraw";
import MyChatBot from "../components/chatbot/llm";
import components from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
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
	)
}

export default Whiteboard
