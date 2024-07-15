import { track, useEditor } from 'tldraw';
import React from 'react';

// Component to get selected texts
const GetSelectedTexts = track(() => {
  const editor = useEditor();

  // Function to get selected texts
  const selectedTexts = editor.getSelectedShapes()
    .filter(shape => shape.type === 'text' && shape.props && shape.props.text)
    .map(shape => shape.props.text);

  console.log('Filtered Selected Texts:', selectedTexts);

  return (
    <div style={{ display: 'none' }}>
      {selectedTexts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
  );
});

export default GetSelectedTexts;