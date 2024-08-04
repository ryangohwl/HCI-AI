import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Tldraw, useEditor, getSnapshot, createShapeId } from "tldraw";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MyChatBot from "../components/chatbot/llm";
import CustomContextMenu from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
import ToolTip from "../components/canvas/ToolTip";
import "../hideToolbar.css"; // Hiding specific tools on toolbar
import instructionsPage from "../instructions-page.png"; // Import instructions ppng
import questionmarkicon from "../questionmark.png"; // Import question mark png

const components = {
  ContextMenu: CustomContextMenu,
  SharePanel: SnapshotButton,
};

// Popup component for displaying the instructions image
function InstructionsPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "white",
          padding: 20,
          borderRadius: 8,
          width: "80%",
          height: "80%",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <img
          src={instructionsPage}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

function Whiteboard() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <InstructionsPopup show={showPopup} onClose={() => setShowPopup(false)} />
      <div
        style={{
          padding: 20,
          pointerEvents: "all",
          display: "flex",
          gap: "10px",
        }}
      >
        <div style={{ position: "fixed", inset: 0 }}>
          <Tldraw components={components}>
            <GetSelectedTexts />
          </Tldraw>
        </div>
        <div className="chatbot">
          <MyChatBot />
        </div>
      </div>
      <button
        onClick={() => setShowPopup(true)}
        style={{
          position: "fixed",
          bottom: 3,
          left: 1115,
          padding: "10px 10px",
          background: "none",
          color: "none",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        <img src={questionmarkicon} alt="Help" style={{ width: "30px", height: "30px" }} />
      </button>
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
    const newTextShapeId = createShapeId();
    editor.createShape({
      id: newTextShapeId,
      type: "text",
      x: 650,
      y: 100,
      props: {
        text: "RIGHT CLICK ANY TEXT BOX TO GET HELP BRAINSTORMING!😄",
      },
    });
  }, [editor]);

  useEffect(() => {
    if (showCheckMark) {
      const timeout = setTimeout(() => {
        setShowCheckMark(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [showCheckMark]);

  const save = useCallback(async () => {
    const { document, session } = getSnapshot(editor.store);
    try {
      const shapeIds = await editor.getCurrentPageShapeIds();
      if (shapeIds.size === 1) {
        const shapeType = editor.getCurrentPageShapes()[0].type;
        if (
          shapeType === "text" &&
          editor.getCurrentPageShapes()[0].props.text ===
            "RIGHT CLICK ANY TEXT BOX TO GET HELP BRAINSTORMING!😄"
        ) {
          try {
            await axios.delete(
              `${import.meta.env.VITE_BASE_URL}/whiteboard/deleteWhiteboard/${userId}/${boardId}`
            );
          } catch (error) {
            console.error("error deleting whiteboard", error);
          }
        } else {
          await axios.put(
            `${import.meta.env.VITE_BASE_URL}/whiteboard/saveWhiteboard`,
            {
              document,
              session,
              userId,
              boardId,
            }
          );
        }
      } else {
        if (shapeIds.size === 0) {
          try {
            await axios.delete(
              `${import.meta.env.VITE_BASE_URL}/whiteboard/deleteWhiteboard/${userId}/${boardId}`
            );
          } catch (error) {
            console.error("error deleting whiteboard", error);
          }
        } else {
          await axios.put(
            `${import.meta.env.VITE_BASE_URL}/whiteboard/saveWhiteboard`,
            {
              document,
              session,
              userId,
              boardId,
            }
          );
        }
      }
    } catch (err) {
      console.error("Error saving whiteboard:", err);
    }
  }, [editor, userId, boardId]);

  return (
    <div
      style={{
        pointerEvents: "all",
        display: "flex",
        gap: "10px",
        width: 300,
        height: 50,
      }}
    >
      <span
        className="relative top-4 left-7 text-5xl"
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
        className="text-white bg-blue-700 hover:bg-blue-800 absolute left-2 bottom-36 h-10 w-30 rounded-full px-4 py-2 text-3xl font-bold"
        onClick={async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/user/${userId}`
          );
          const user = response.data.user;

          await save();
          navigate("/home", {
            replace: true,
            state: { user: user },
          });
        }}
      >
        Back to Home
      </button>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 absolute top-4 right-2 text-3xl font-bold px-10 py-2 rounded-full"
        onClick={async () => {
          await save();
          setShowCheckMark(true);
        }}
      >
        Save Canvas
      </button>
    </div>
  );
}
