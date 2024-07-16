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

      // Find the shape with the maximum width to determine the rightmost edge
      let maxRightEdge = 0;
      selectedShapes.forEach(shape => {
        const rightEdge = shape.x + (shape.props.width || 200);
        if (rightEdge > maxRightEdge) {
          maxRightEdge = rightEdge;
        }
      });

      // Adding a large margin to the new shapes
      const margin = 1200;
      const offsetX = maxRightEdge + margin;
      const offsetY = 50;

      const newShapes = items.map((item, index) => {
        const position = {
          x: offsetX,
          y: selectedShapes[0].y + index * (selectedShapes[0].props.height || 50) + offsetY * index,
        };

        console.log('Creating shape at position:', position, 'with text:', item);
        const newTextShapeId = createShapeId();

        editor.createShapes([
          {
            id: newTextShapeId,
            type: 'text',
            x: position.x,
            y: position.y,
            props: { text: item },
          },
        ]);

        return {
          id: newTextShapeId,
          position,
        };
      });

      console.log('All shapes created:', newShapes);

      // Create arrows connecting the original shapes to the new shapes
      newShapes.forEach(({ id: newShapeId, position: newPosition }) => {
        selectedShapes.forEach(selectedShape => {
          const startX = selectedShape.x + (selectedShape.props.width || 200);
          const startY = selectedShape.y + (selectedShape.props.height || 50) / 2;
          const endX = newPosition.x;
          const endY = newPosition.y + (selectedShape.props.height || 50) / 2;

          console.log('Creating arrow from:', { x: startX, y: startY }, 'to:', { x: endX, y: endY });

          editor.createShapes([
            {
              id: createShapeId(),
              type: 'arrow',
              props: {
                start: { x: startX, y: startY },
                end: { x: endX, y: endY },
              },
            },
          ]);
          console.log('Created arrow from', selectedShape.id, 'to', newShapeId);
        });
      });
    } else {
      console.error('No items generated.');
    }
  } catch (error) {
    console.error('Error generating items:', error);
  } finally {
    document.body.classList.remove('loading-cursor'); // Remove loading cursor class
  }
};

// Component to get selected texts and handle events
const GetSelectedTexts = track(() => {
  const editor = useEditor();
  const [selectedText, setSelectedText] = useState('');
  const [selectedTexts, setSelectedTexts] = useState([]);

  // Function to update selected text
  const updateSelectedText = () => {
    const selectedTextsArray = editor.getSelectedShapes()
      .filter(shape => shape.type === 'text' && shape.props && shape.props.text)
      .map(shape => shape.props.text);

    console.log('Updating selected text from selectedTexts:', selectedTextsArray);
    if (selectedTextsArray.length > 0) {
      setSelectedText(selectedTextsArray.join(' '));
      setSelectedTexts(selectedTextsArray);  // Update the selectedTexts state
      console.log('Selected text set to:', selectedTextsArray.join(' '));
    } else {
      setSelectedText('');
      setSelectedTexts([]);  // Clear the selectedTexts state
      console.log('Selected text cleared');
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

    console.log('Adding event listeners');
    editor.on('pointerdown', handleClick);
    editor.on('selectionchange', updateSelectedText);

    return () => {
      console.log('Removing event listeners');
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
