import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import { Tldraw } from "tldraw";
import MyChatBot from "./components/chatbot/llm";
import ChatBot from "react-chatbotify";

function App() {
  return (
    <div>
      <div className="tldraw">
        <Tldraw />
      </div>
      <div className="chatbot">
        <MyChatBot />
        {/* <ChatBot /> */}
      </div>
    </div>
  );
}

export default App;
