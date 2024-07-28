import React, { useState } from "react";
import { exportToBlob, Tldraw, useEditor } from 'tldraw'
function GetImageButton() {
	const editor = useEditor()
	return (
		<>
		<button 
        style={{ pointerEvents: 'all', fontSize: 18, 
            backgroundColor: '#EFBE7B',
            padding: "10px 30px" ,
        margin:"100px 10px"}}
			onClick={async() => {
				const { document, session } = getSnapshot(editor.store)
				// If you are building a multi-user app, you probably want to store
				// the document and session states separately because the
				// session state is user-specific and normally shouldn't be shared.
				await saveDocumentState(documentId, document)
				await saveSessionState(documentId, userId, session)
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
				const shapeIds = editor.getCurrentPageShapeIds()
				if (shapeIds.size === 0) return alert('No shapes on the canvas')
				const blob = await exportToBlob({
					editor,
					ids: [...shapeIds],
					format: 'png',
					opts: { background: false },
				})

				const link = document.createElement('a')
				link.href = window.URL.createObjectURL(blob)
				link.download = 'every-shape-on-the-canvas.jpg'
				link.click()
			}}
		>
			Save Image
		</button>
		</>
	)
}
export default GetImageButton