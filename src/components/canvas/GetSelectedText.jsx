import React, { useEffect, useState } from 'react';
import { track, useEditor } from 'tldraw';
import { generateQuestions, generateAnswers, generateIdeas } from './GenerateLLM';
import { createShapeId } from '@tldraw/tldraw';

// Function to handle generating items and positioning them
const handleGenerateItems = async (editor, selectedText, generateFunction, numItems) => {
  console.log('Generating items for selected text:', selectedText);
  if (!selectedText) {
    console.error('No text found for generating items.');
    return;
  }

  try {
    const items = await generateFunction(selectedText, numItems);
    console.log('Generated items:', items);

    if (items.length > 0) {
      const selectedShapes = editor.getSelectedShapes();
      console.log('Selected shapes:', selectedShapes);
      if (selectedShapes.length === 0) {
        console.error('No shapes selected.');
        return;
      }

      const originalShape = selectedShapes[0];
      console.log('Original shape:', originalShape);
      const originalPosition = { x: originalShape.x, y: originalShape.y };
      const originalWidth = originalShape.props.width || 200;
      const originalHeight = originalShape.props.height || 50;
      const offsetX = 1000;
      const offsetY = 100;
      const fromGenerateShapeId = originalShape.id

      const createShapesPromises = items.map((item, index) => {
        const position = {
          x: originalPosition.x + originalWidth + offsetX,
          y: originalPosition.y + index * (originalHeight + offsetY),
        };

        console.log('Creating shape at position:', position, 'with text:', item);
        const newTextShapeId = createShapeId();
        const newArrowShapeId = createShapeId();
        return (editor.createShapes([
          {
            id: newTextShapeId,
            type: 'text',
            x: position.x,
            y: position.y,
            props: { text: item, w:300, autoSize:false, w: 1100},
          }]),
          editor.createShape({
            id: newArrowShapeId,
            type: "arrow",
            props: {
              color: "black",
            },
            }),
          editor.createBinding({
            type: 'arrow',
            fromId: newArrowShapeId,
            toId: newTextShapeId,
            props: {
              terminal: 'end',
              normalizedAnchor: { x: 0, y: 0.5 }, // Normalized center position of the shape
              isExact: true,
              isPrecise: true
            }
            }),
          
            // Bind the end of the arrow to the second text shape
            editor.createBinding({
            type: 'arrow',
            fromId: newArrowShapeId,
            toId: fromGenerateShapeId,
            props: {
              terminal: 'start',
              normalizedAnchor: { x: 1, y: 0.5}, // Normalized center position of the shape
              isExact: true,
              isPrecise: true
            }
            })
          )
      });

      await Promise.all(createShapesPromises);
      console.log('All shapes created');
    } else {
      console.error('No items generated.');
    }
  } catch (error) {
    console.error('Error generating items:', error);
  }
};

// Component to get selected texts and handle events
const GetSelectedTexts = track(() => {
  const editor = useEditor();
  const [selectedText, setSelectedText] = useState('');
  const [selectedTexts, setSelectedTexts] = useState([]);
  if (editor.getSelectedShapes().length > 0) {
		editor.getSelectedShapes().map((shape) =>
			console.log(shape.props)
		);
	}
  // Function to update selected text
  const updateSelectedText = () => {
    const selectedTextsArray = editor.getSelectedShapes()
      .filter(shape => shape.type === 'text' && shape.props && shape.props.text)
      .map(shape => shape.props.text);
if (editor.getSelectedShapes().length > 0) {
		editor.getSelectedShapes().map((shape) =>
			console.log(shape.props.text)
		);
	}
    // console.log('Updating selected text from selectedTexts:', selectedTextsArray);
    if (selectedTextsArray.length > 0) {
      setSelectedText(selectedTextsArray.join(' '));
      setSelectedTexts(selectedTextsArray);  // Update the selectedTexts state
      console.log('Selected text set to:', selectedTextsArray.join(' '));
    } else {
      setSelectedText('');
      setSelectedTexts([]);  // Clear the selectedTexts state
      // console.log('Selected text cleared');
    }
  };

  // Handle click event
  const handleClick = (event) => {
    console.log('Handling click at point:', { x: event.clientX, y: event.clientY });
    const shape = editor.getShapeAtPoint({ x: event.clientX, y: event.clientY });
    if (shape && shape.type === 'text') {
      editor.selectShape(shape.id);
      updateSelectedText(); // Update the selected text immediately after selection
      console.log('Shape selected and text set:', shape.props.text);
    } else {
      console.log('No text shape found at clicked point');
    }
  };

  useEffect(() => {
    // Ensure editor is ready before adding listeners
    if (!editor) return;
    updateSelectedText();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    // console.log('Adding event listeners');
    editor.on('pointerdown', handleClick);
    editor.on('selectionchange', updateSelectedText);

    return () => {
      // console.log('Removing event listeners');
      editor.off('pointerdown', handleClick);
      editor.off('selectionchange', updateSelectedText);
    };
  }, [editor]);

  return (
    <div style={{ display: 'none' }}>
      {selectedTexts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
  );
});

export default GetSelectedTexts;
export { handleGenerateItems };


