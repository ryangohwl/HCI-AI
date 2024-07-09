import React from "react";
import "./App.css";
import "./index.css";
import { Tldraw } from "tldraw";
import MyChatBot from "./components/chatbot/llm";
// import Button from "./components/canvas/Button";

function App() {
  return (
    <div>
      <div className="tldraw">
        <Tldraw />
      </div>
      <div className="chatbot">
        <MyChatBot />
      </div>
    </div>
  );
}

export default App;
