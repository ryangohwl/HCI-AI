

import React, { useState } from "react";
import { Tldraw, useEditor, getSnapshot } from 'tldraw';
import { useNavigate } from "react-router-dom";
import MyChatBot from "../components/chatbot/llm";
import CustomContextMenu from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";

import "../hideToolbar.css"; // Import the CSS file with the correct path

import axios from "axios";
import { useLocation } from "react-router-dom";
import { useMemo,useEffect, useCallback } from "react";
// import SnapshotButton from '../components/canvas/SavingButtons';

const components = {
  ContextMenu: CustomContextMenu,
  SharePanel: SnapshotButton,
};



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

function passDetails() {
  const location = useLocation();
  const details = useMemo(() => {
    const items = location.state;
    if (!items) return { userId: null, boardId: null };
    const userId = items.userId;
    const boardId = items.whiteboardId;
    return { userId, boardId };
  }, [location.state]);

  return details;
}

export function SnapshotButton() {
  const navigate = useNavigate();
  const { userId, boardId } = passDetails();
  const editor = useEditor();
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showCheckMark) {
      const timeout = setTimeout(() => {
        setShowCheckMark(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [showCheckMark]);

  const save = useCallback(async () => {
    try {

      const shapeIds = await editor.getCurrentPageShapeIds();
      // console.log(shapeIds)
      if (shapeIds.size === 0) {
        console.log("hello")
        try{
        const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/whiteboard/deleteWhiteboard/${userId}/${boardId}`)
        }
        catch (error) {
          console.error("error deleting whiteboard",err)
        }
      }
      else {
      const { document, session } = getSnapshot(editor.store);
      //CHECKED
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/whiteboard/saveWhiteboard`,
        {
          document,
          session,
          userId,
          boardId
        }
      );
      }
    } catch (err) {
      console.error("Error saving whiteboard:", err);
    }
    
  }, [editor, userId, boardId]);




  return (
    <div
      style={{
        padding: 20,
        pointerEvents: "all",
        display: "flex",
        gap: "10px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.2s ease, opacity 0.2s ease",
          transform: showCheckMark ? `scale(1)` : `scale(0.5)`,
          opacity: showCheckMark ? 1 : 0,
        }}
      >
        Saved ✅
      </span>
      <button
      className=" text-white bg-blue-700 hover:bg-blue-800  absolute left-2 bottom-36 h-10 w-30 rounded-full px-4 py-2 text-3xl font-bold"
        onClick={async () => {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/user/${userId}`
          );
          const user = response.data.user;

            await save()
            navigate("/home", {
              replace: true,
              state: { user: user },
            });

        }}
        
      >
        Back to Home
      </button>
      <button
      className="text-white bg-blue-700 hover:bg-blue-800 absolute top-2 right-2 text-3xl font-bold px-4 py-2 rounded-full"
        onClick={ async() => {
          await save();
          setShowCheckMark(true);
        }}
      >
        Save Canvas
      </button>
      {/* <button onClick={load}>Load Snapshot</button> */}
    </div>
  );
}

