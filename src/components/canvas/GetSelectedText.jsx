import { useEditor } from 'tldraw';
import React from 'react';

const useSelectedTexts = () => {
  const editor = useEditor();
  let selectedTexts = [];

  if (editor.getSelectedShapes().length > 0) {
    selectedTexts = editor.getSelectedShapes().map((shape) => shape.props.text);
  }

  return selectedTexts;
};

export default useSelectedTexts;
