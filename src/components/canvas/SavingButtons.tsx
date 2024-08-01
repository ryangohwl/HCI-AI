// import React, { useState } from "react";
// import { exportToBlob, Tldraw, useEditor } from 'tldraw'
// function GetImageButton() {
// 	const editor = useEditor()
// 	return (
// 		<>
// 		<button
// 			onClick={async() => {
// 				const document = await loadDocumentState(documentId)
// 				const session = await loadSessionState(documentId, userId)
// 				editor.setCurrentTool('select') // need to reset tool state separately
// 				loadSnapshot(editor.store, { document, session })
// 			}}
// 		>
// 			Load
// 		</button>

// 		<button
//         style={{ pointerEvents: 'all', fontSize: 18,
//             backgroundColor: '#EFBE7B',
//             padding: "10px 30px" ,
//         margin:"10px 10px"}}
// 			onClick={async() => {
// 				const { document, session } = getSnapshot(editor.store)
// 				// If you are building a multi-user app, you probably want to store
// 				// the document and session states separately because the
// 				// session state is user-specific and normally shouldn't be shared.
// 				await saveDocumentState(documentId, document)
// 				await saveSessionState(documentId, userId, session)
// 			}}
// 		>
// 			Save Json
// 		</button>

// 		<button
// 			style={{ pointerEvents: 'all', fontSize: 18,
// 				backgroundColor: '#EFBE7B',
// 				padding: "10px 30px" ,
// 			margin:"10px 10px"}}
// 			onClick={async () => {
// 				const shapeIds = editor.getCurrentPageShapeIds()
// 				if (shapeIds.size === 0) return alert('No shapes on the canvas')
// 				const blob = await exportToBlob({
// 					editor,
// 					ids: [...shapeIds],
// 					format: 'png',
// 					opts: { background: false },
// 				})

// 				const link = document.createElement('a')
// 				link.href = window.URL.createObjectURL(blob)
// 				link.download = 'every-shape-on-the-canvas.jpg'
// 				link.click()
// 			}}
// 		>
// 			Save Image
// 		</button>
// 		</>
// 	)
// }
// export default GetImageButton

// import React from 'react';
// import { exportToBlob, useEditor, getSnapshot, loadSnapshot } from 'tldraw';

// async function saveDocumentState(documentId, document) {
//   // Implement your save logic here
//   console.log('Saving document state', documentId, document);
//   // Example: save to localStorage (replace with your database save logic)
//   localStorage.setItem(`document-${documentId}`, JSON.stringify(document));
// }

// async function saveSessionState(documentId, userId, session) {
//   // Implement your save logic here
//   console.log('Saving session state', documentId, userId, session);
//   // Example: save to localStorage (replace with your database save logic)
//   localStorage.setItem(`session-${documentId}-${userId}`, JSON.stringify(session));
// }

// async function loadDocumentState(documentId) {
//   // Implement your load logic here
//   console.log('Loading document state', documentId);
//   // Example: load from localStorage (replace with your database load logic)
//   const document = localStorage.getItem(`document-${documentId}`);
//   return document ? JSON.parse(document) : null;
// }

// async function loadSessionState(documentId, userId) {
//   // Implement your load logic here
//   console.log('Loading session state', documentId, userId);
//   // Example: load from localStorage (replace with your database load logic)
//   const session = localStorage.getItem(`session-${documentId}-${userId}`);
//   return session ? JSON.parse(session) : null;
// }

// function GetImageButton({ documentId, userId }) {
//   const editor = useEditor();

//   return (
//     <>
//       <button
// 	  style={{ pointerEvents: 'all', fontSize: 18,
//             backgroundColor: '#EFBE7B',
//             padding: "10px 30px" ,
//         margin:"10px 10px"}}
//         onClick={async () => {
//           const document = await loadDocumentState(documentId);
//           const session = await loadSessionState(documentId, userId);
//           if (document && session) {
//             editor.setCurrentTool('select'); // need to reset tool state separately
//             loadSnapshot(editor.store, { document, session });
//           } else {
//             console.error('Failed to load document or session state');
//           }
//         }}
//       >
//         Load
//       </button>

//       <button
//         style={{ pointerEvents: 'all', fontSize: 18,
//             backgroundColor: '#EFBE7B',
//             padding: "10px 30px" ,
//         margin:"10px 10px"}}
//         onClick={async () => {
//           const { document, session } = getSnapshot(editor.store);
//           // If you are building a multi-user app, you probably want to store
//           // the document and session states separately because the
//           // session state is user-specific and normally shouldn't be shared.
//           await saveDocumentState(documentId, document);
//           await saveSessionState(documentId, userId, session);
//         }}
//       >
//         Save Json
//       </button>

//       <button
//         style={{ pointerEvents: 'all', fontSize: 18,
//           backgroundColor: '#EFBE7B',
//           padding: "10px 30px" ,
//         margin:"10px 10px"}}
//         onClick={async () => {
//           const shapeIds = editor.getCurrentPageShapeIds();
//           if (shapeIds.size === 0) return alert('No shapes on the canvas');
//           const blob = await exportToBlob({
//             editor,
//             ids: [...shapeIds],
//             format: 'png',
//             opts: { background: false },
//           });

//           const link = document.createElement('a');
//           link.href = window.URL.createObjectURL(blob);
//           link.download = 'every-shape-on-the-canvas.jpg';
//           link.click();
//         }}
//       >
//         Save Image
//       </button>
//     </>
//   );
// }

// export default GetImageButton;
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TLEditorSnapshot,
  Tldraw,
  getSnapshot,
  exportToBlob,
  TLUiComponents,
  useEditor,
} from "tldraw";
import "tldraw/tldraw.css";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";

// import _jsonSnapshot from "./snapshot.json";

// There's a guide at the bottom of this file!

// const jsonSnapshot = _jsonSnapshot as any as TLEditorSnapshot;

// [1]

function SnapshotButton() {
  const editor = useEditor();
  const items = useLocation().state;
  const boardId = items.whiteboardId;
  const userId = items.userId;

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
      console.log("here");
      console.log(document);
      console.log(session);
      console.log(userId);
      console.log(boardId);

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/whiteboard/saveWhiteboard`,
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
    const response = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/whiteboard/loadWhiteboard/${userId}/${boardId}`
    );
    const document = JSON.parse(response.data.document);
    const session = JSON.parse(response.data.session);
  }, [editor]);
  const navigate = useNavigate();
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
        onClick={async () => {
          await save();
          setShowCheckMark(true);
        }}
      >
        Save Canvas
      </button>
      {/* <button onClick={load}>Load Snapshot</button> */}
      <button
        onClick={async () => {
          save();

          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/user/${userId}`
          );

          const user = response.data.user;
          navigate("/home", {
            replace: true,
            state: { user: user },
          });
        }}
        className='absolute left-2 top-10 h-10 w-16 ...'
      >
        Back
      </button>
    </div>
  );
}

export default SnapshotButton;
// export default function SnapshotExample() {
//   return (
//     <div className='tldraw__editor'>
//       <Tldraw
//         // [5]
//         snapshot={jsonSnapshot}
//         components={{
//           SharePanel: SnapshotToolbar,
//         }}
//       />
//     </div>
//   );
// }
