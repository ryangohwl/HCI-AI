import React, { useState } from "react";
import { Tldraw } from "tldraw";
import MyChatBot from "../components/chatbot/llm";
import components from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
 function Whiteboard() {
  const [extractedData, setExtractedData] = useState([]);

  // Function to extract text and images
  const extractData = () => {
    const texts = []; // Logic to extract texts
    const images = []; // Logic to extract images

    // Example: Assuming GetSelectedTexts component provides selected texts
    const selectedTexts = GetSelectedTexts(); // Modify as per actual implementation
    texts.push(...selectedTexts);

    // Example: Assuming Tldraw component provides images
    const whiteboardImages = []; // Modify as per actual implementation
    images.push(...whiteboardImages);

    setExtractedData([...texts, ...images]);
  };

  // Function to save data to a file
  const saveDataToFile = () => {
    const fileData = JSON.stringify(extractedData, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "whiteboard_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };


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
