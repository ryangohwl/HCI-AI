import { track, useEditor } from 'tldraw';
import React from 'react';

const GetSelectedTexts = track(() => {
	const editor = useEditor();
    // console.log(editor.getSelectedShapeIds())
	if (editor.getSelectedShapes().length > 0) {
		editor.getSelectedShapes().map((shape) =>
			console.log(shape.props.text)
		);
	}
	return <div>{editor.getSelectedShapeIds().length}</div>;
});

export default GetSelectedTexts;