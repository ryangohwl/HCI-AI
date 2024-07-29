import React, { useState } from "react";
import { exportToBlob, Tldraw, useEditor } from 'tldraw'
import MyChatBot from "../components/chatbot/llm";
import CustomContextMenu from "../components/canvas/RightClickGenerate";
import GetSelectedTexts from "../components/canvas/GetSelectedText";
import SnapshotButton from '../components/canvas/SavingButtons'
import { useLocation } from "react-router-dom";

const components = {
	ContextMenu: CustomContextMenu,
	SharePanel: SnapshotButton,
  };


function OldWhiteboard() {
  console.log(`here:`+ boardId)
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

export default OldWhiteboard
