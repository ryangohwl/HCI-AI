import React, { useState } from "react";
import "./App.css";
import "./index.css";
import { Tldraw } from "tldraw";
import MyChatBot from "./components/chatbot/llm";
import Login from "./LoginPage";
import components from "./components/canvas/RightClickGenerate";
import GetSelectedTexts from "./components/canvas/GetSelectedText";
function App() {
  // State to manage whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLoginSuccess} />
      ) : (
        <>
          <div className="tldraw">
            <Tldraw persistenceKey="Save-Whiteboard" components={components}>
              <GetSelectedTexts />
            </Tldraw>
          </div>
          <div className="chatbot">
            <MyChatBot />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
