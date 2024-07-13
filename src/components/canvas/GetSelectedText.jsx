import { track, useEditor } from 'tldraw';
import React, { useEffect, useState } from 'react';

const GetSelectedTexts = track(() => {
  const editor = useEditor();

  const getSelectedText = () => {
    if (editor.getSelectedShapes().length > 0) {
      return editor
        .getSelectedShapes()
        .filter(shape => shape.type === 'text')
        .map(shape => shape.props.text)
        .join(' ');
    }
    return '';
  };

  return (
    <div>
      {editor.getSelectedShapeIds().length}
      {getSelectedText()}
    </div>
  );
});

export const useSelectedText = () => {
  const editor = useEditor();
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    if (editor) {
      const getSelectedText = () => {
        const selectedShapes = editor.getSelectedShapes();
        const textInput = selectedShapes
          .filter(shape => shape.type === 'text')
          .map(shape => shape.props.text)
          .join(' ');

        setSelectedText(textInput);
      };

      getSelectedText();

      const handleChange = () => {
        getSelectedText();
      };

      editor.on('change', handleChange);

      return () => {
        editor.off('change', handleChange);
      };
    }
  }, [editor]);

  return selectedText;
};

export default GetSelectedTexts;
