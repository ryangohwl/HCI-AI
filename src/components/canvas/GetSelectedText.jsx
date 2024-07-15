import { useEditor } from 'tldraw';
import React from 'react';

const useSelectedTexts = () => {
  const editor = useEditor();
  let selectedTexts = [];

  const selectedShapes = editor.getSelectedShapes();
  console.log('Selected Shapes:', selectedShapes); // Debug log

  if (selectedShapes.length > 0) {
    selectedTexts = selectedShapes
      .filter(shape => shape.type === 'text' && shape.props && shape.props.text)
      .map(shape => shape.props.text);

    console.log('Filtered Selected Texts:', selectedTexts); // Debug log
  }

  return selectedTexts;
};

export default useSelectedTexts;
