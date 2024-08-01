import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  exportToBlob,
  Tldraw,
  useEditor,
  getSnapshot,
  loadSnapshot,
} from "tldraw";
import axios from "axios";
import MyChatBot from "../components/chatbot/llm";
import CustomContextMenu from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetArrows } from "../components/canvas/sharedComps";


const components = {
  ContextMenu: CustomContextMenu,
  SharePanel: SnapshotButton,
};

function passDetails() {
  const location = useLocation();
  const details = useMemo(() => {
    const items = location.state;
    if (!items) return { userId: null, boardId: null };
    const userId = items.userId;
    const boardId = items.boardId;
    return { userId, boardId };
  }, [location.state]);

  return details;
}

export default function OldWhiteboard() {
  const { userId, boardId } = passDetails();

  return (
    <>
      <div style={{ position: "fixed", inset: 0 }}>
        <Tldraw components={components}>
          <GetSelectedTexts />
        </Tldraw>
      </div>
      <div className='chatbot'>
        <MyChatBot />
      </div>
    </>
  );
}



export function SnapshotButton() {
  const navigate = useNavigate();
  const { userId, boardId } = passDetails();
  const editor = useEditor();
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [error, setError] = useState(null);
  const handleGetSelectedShapes = useGetArrows()


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
      if (shapeIds.size === 0) return alert("No shapes on the canvas");
      const { document, session } = getSnapshot(editor.store);
      const blob = await exportToBlob({
        editor,
        ids: [...shapeIds],
        format: "png",
        opts: { background: false },
      });

      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/whiteboard/saveWhiteboard`,
        {
          document,
          session,
          userId,
          boardId,
        }
      );
    } catch (err) {
      console.error("Error saving whiteboard:", err);
    }
  }, [editor, userId, boardId]);

  const load = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/whiteboard/loadWhiteboard/${userId}/${boardId}`
      );
      const loadedDocument = JSON.parse(response.data.document);
      const loadedSession = JSON.parse(response.data.session);
      const snapshot = {
        document: loadedDocument,
        session: loadedSession,
      };
      loadSnapshot(editor.store, snapshot);
    } catch (err) {
      setError(err);
      console.error("Error loading whiteboard:", err);
    }
  }, [editor, userId, boardId]);

  useEffect(() => {
    load();
  }, [load]);

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
        onClick={async () => {
          try {
            console.log(userId);
            const response = await axios.get(
              `${process.env.REACT_APP_API_BASE_URL}/user/${userId}`
            );
            const user = response.data.user;
            await save();
            navigate("/home", {
              replace: true,
              state: { user: user },
            });
          } catch (err) {
            console.error("Error navigating back:", err);
          }
        }}
      className=" text-white bg-blue-700 hover:bg-blue-800  absolute left-2 bottom-36 h-10 w-30 rounded-full px-4 py-2 text-3xl font-bold"
      >
        Back to Home
      </button>
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 absolute top-2 right-2 text-3xl font-bold px-4 py-2 rounded-full'
        onClick={async () => {
          await save();
          setShowCheckMark(true);
        }}
        x
      >
        Save Canvas
      </button>
      {/* <button
      className=" text-white bg-blue-700 hover:bg-blue-800  absolute left-20 top-12 h-10 w-16 rounded-full px-4 py-2 text-3xl font-bold"
        onClick={async () => {
          console.log(editor.getShape(editor.getSelectedShapeIds()[0]))

        }}
        
      >
        get shape
      </button> */}

      {/* <button
        onClick={handleGetSelectedShapes}
        className='text-white bg-blue-700 hover:bg-blue-800 absolute top-2 right-30 text-3xl font-bold px-4 py-2 rounded-full'
      >
        Load Snapshot
      </button> */}
    </div>
  );
}
