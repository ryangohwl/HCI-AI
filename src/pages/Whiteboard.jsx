import React, { useState } from "react";
import { Tldraw, useEditor } from 'tldraw';
import { useNavigate } from "react-router-dom";
import MyChatBot from "../components/chatbot/llm";
import CustomContextMenu from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
import SnapshotButton from '../components/canvas/SavingButtons';

const components = {
  ContextMenu: CustomContextMenu,
  SharePanel: SnapshotButton,
};

function BackButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')}
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Back to Homepage
    </button>
  );
}

function Whiteboard() {
  return (
    <>
    <div
      style={{
        padding: 20,
        pointerEvents: "all",
        display: "flex",
        gap: "10px",
      }}
    >
      {/* <button
        onClick={() => {
          // save();
          setShowCheckMark(true);
        }}
      >
        Save Canvas
      </button> */}
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw components={components}>
          <GetSelectedTexts />
        </Tldraw>
      </div>
      <div className="chatbot">
        <MyChatBot />
      </div>
      
      </div>
    </>
  );
}

export default Whiteboard;