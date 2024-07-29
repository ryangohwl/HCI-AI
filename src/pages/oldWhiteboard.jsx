import React, { useState,useCallback,useEffect } from "react";
import { exportToBlob, Tldraw, useEditor } from 'tldraw'
import MyChatBot from "../components/chatbot/llm";
import CustomContextMenu from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
// import SnapshotButton from '../components/canvas/SavingButtons'
import { useLocation } from "react-router-dom";

const components = {
	ContextMenu: CustomContextMenu,
	SharePanel: SnapshotButton,
  };

export function passDetails() {
  const items = useLocation().state
  const userId= items.userId
  const boardId= items.boardId
  return { userId, boardId };
}

function oldWhiteboard() {
  const items = useLocation().state
  const boardId = items.oldWhiteboardId;
  const userId = items.userId;
  console.log(`here:`+ boardId)
  // const load = useCallback(async () => {
  // const response = await axios.get(
  //     `http://localhost:3000/oldWhiteboard/loadoldWhiteboard/${userId}/${boardId}`
  //   );
  //   const document = JSON.parse(response.data.document);
  //   const session = JSON.parse(response.data.session);
  //   console.log(document);
  // }, [editor]);
  return (
    <>
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw  components={components}>
          <GetSelectedTexts />
        </Tldraw>
      </div>
      <div className="chatbot">
        <MyChatBot />
      </div>
    </>
  );
}

export default oldWhiteboard

export function SnapshotButton() {
  const {userId, boardId} = passDetails()
  console.log(userId)
  const editor = useEditor();
  const items = useLocation().state;
  const save = useCallback(async () => {
    const shapeIds = editor.getCurrentPageShapeIds();
    const { document, session } = getSnapshot(editor.store);
    if (shapeIds.size === 0) return alert("No shapes on the canvas");
    const blob = await exportToBlob({
      editor,
      ids: [...shapeIds],
      format: "png",
      opts: { background: false },
    });

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    (reader.onloadend = async () => {
      const base64data = reader.result;

      const response = await axios.put(
        "http://localhost:3000/whiteboard/saveWhiteboard",
        {
          document,
          session,
          userId,
          boardId
        }
      );
      //     localStorage.setItem("snapshot", JSON.stringify({ document, session }));
    }),
      [editor];
  });

  const load = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:3000/whiteboard/loadWhiteboard/${userId}/${boardId}`
    );
    const document = JSON.parse(response.data.document);
    const session = JSON.parse(response.data.session);
    console.log(document);
  }, [editor]);

  const [showCheckMark, setShowCheckMark] = useState(false);
  useEffect(() => {
    if (showCheckMark) {
      const timeout = setTimeout(() => {
        setShowCheckMark(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
    return;
  });

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
        onClick={() => {
          save();
          setShowCheckMark(true);
        }}
      >
        Save Canvas
      </button>
      <button onClick={load}>Load Snapshot</button>
    </div>
  );
}
