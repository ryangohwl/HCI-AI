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

import React from 'react';
import { exportToBlob, useEditor, getSnapshot, loadSnapshot } from 'tldraw';

async function saveDocumentState(documentId, document) {
  // Implement your save logic here
  console.log('Saving document state', documentId, document);
  // Example: save to localStorage (replace with your database save logic)
  localStorage.setItem(`document-${documentId}`, JSON.stringify(document));
}

async function saveSessionState(documentId, userId, session) {
  // Implement your save logic here
  console.log('Saving session state', documentId, userId, session);
  // Example: save to localStorage (replace with your database save logic)
  localStorage.setItem(`session-${documentId}-${userId}`, JSON.stringify(session));
}

async function loadDocumentState(documentId) {
  // Implement your load logic here
  console.log('Loading document state', documentId);
  // Example: load from localStorage (replace with your database load logic)
  const document = localStorage.getItem(`document-${documentId}`);
  return document ? JSON.parse(document) : null;
}

async function loadSessionState(documentId, userId) {
  // Implement your load logic here
  console.log('Loading session state', documentId, userId);
  // Example: load from localStorage (replace with your database load logic)
  const session = localStorage.getItem(`session-${documentId}-${userId}`);
  return session ? JSON.parse(session) : null;
}

function GetImageButton({ documentId, userId }) {
  const editor = useEditor();

  return (
    <>
      <button
	  style={{ pointerEvents: 'all', fontSize: 18, 
            backgroundColor: '#EFBE7B',
            padding: "10px 30px" ,
        margin:"10px 10px"}}
        onClick={async () => {
          const document = await loadDocumentState(documentId);
          const session = await loadSessionState(documentId, userId);
          if (document && session) {
            editor.setCurrentTool('select'); // need to reset tool state separately
            loadSnapshot(editor.store, { document, session });
          } else {
            console.error('Failed to load document or session state');
          }
        }}
      >
        Load
      </button>
      
      <button 
        style={{ pointerEvents: 'all', fontSize: 18, 
            backgroundColor: '#EFBE7B',
            padding: "10px 30px" ,
        margin:"10px 10px"}}
        onClick={async () => {
          const { document, session } = getSnapshot(editor.store);
          // If you are building a multi-user app, you probably want to store
          // the document and session states separately because the
          // session state is user-specific and normally shouldn't be shared.
          await saveDocumentState(documentId, document);
          await saveSessionState(documentId, userId, session);
        }}
      >
        Save Json
      </button>
      
      <button
        style={{ pointerEvents: 'all', fontSize: 18, 
          backgroundColor: '#EFBE7B',
          padding: "10px 30px" ,
        margin:"10px 10px"}}
        onClick={async () => {
          const shapeIds = editor.getCurrentPageShapeIds();
          if (shapeIds.size === 0) return alert('No shapes on the canvas');
          const blob = await exportToBlob({
            editor,
            ids: [...shapeIds],
            format: 'png',
            opts: { background: false },
          });

          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'every-shape-on-the-canvas.jpg';
          link.click();
        }}
      >
        Save Image
      </button>
    </>
  );
}

export default GetImageButton;
