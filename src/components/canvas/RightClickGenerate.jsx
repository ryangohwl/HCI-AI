import React, { useState, useEffect, useRef } from 'react';
import {
  ContextMenu,
  DefaultContextMenu,
  DefaultContextMenuContent,
  TLComponents,
  TldrawUiMenuItem,
  createShapeId,
  useEditor,
} from '@tldraw/tldraw';
import 'tldraw/tldraw.css';
import { useSelectedText } from './GetSelectedText'; // Correctly import the custom hook
import { generateQuestions } from './rightclickchatbot'; // Adjust the import path

const CustomContextMenu = (props) => {
  const editor = useEditor();
  const [numQuestions, setNumQuestions] = useState(10);
  const selectedText = useSelectedText(); // Use the custom hook
  const [originalText, setOriginalText] = useState('');
  const arrowBindings = useRef([]);

  useEffect(() => {
    const handlePointerDown = (info) => {
      const shape = editor.getShape(info.target);
      if (shape && shape.props && shape.props.text) {
        handleNewTextClick(shape.props.text);
      }
    };

    const handleShapeChange = () => {
      updateArrows();
    };

    editor.on('pointerdown', handlePointerDown);
    editor.on('shapechange', handleShapeChange);
    editor.on('shapecreate', handleShapeChange);
    editor.on('shapemove', handleShapeChange);
    editor.on('shaperesize', handleShapeChange);

    return () => {
      editor.off('pointerdown', handlePointerDown);
      editor.off('shapechange', handleShapeChange);
      editor.off('shapecreate', handleShapeChange);
      editor.off('shapemove', handleShapeChange);
      editor.off('shaperesize', handleShapeChange);
    };
  }, [editor]);

  const handleGenerateQuestions = async () => {
    if (!selectedText) {
      console.error('No text found for generating questions.');
      return;
    }

    setOriginalText(selectedText); // Save the original text

    try {
      const questions = await generateQuestions(selectedText, numQuestions);
      console.log('Generated questions:', questions); // Debug: Log the generated questions

      if (questions.length > 0) {
        const selectedShapes = editor.getSelectedShapes();
        if (selectedShapes.length === 0) {
          console.error('No shapes selected.');
          return;
        }

        const originalShape = selectedShapes[0];
        const originalPosition = { x: originalShape.x, y: originalShape.y };
        const originalWidth = originalShape.props.width || 200; // Assume a default width if not specified
        const originalHeight = originalShape.props.height || 50; // Assume a default height if not specified
        const offsetX = 20; // Closer offset distance for new text boxes
        const offsetY = 50; // Offset distance for new text boxes vertically

        const createShapesPromises = questions.map((question, index) => {
          let position;
          let start;
          let end;
          if (index < 5) {
            position = { x: originalPosition.x + originalWidth + offsetX, y: originalPosition.y + index * offsetY };
            start = {
              x: originalPosition.x + originalWidth, // Right side of the original text box
              y: originalPosition.y + (originalHeight / 2), // Vertical middle of the original text box
            };
            end = {
              x: position.x,
              y: position.y + (originalHeight / 2), // Vertical middle of the new text box
            };
          } else {
            position = { x: originalPosition.x - offsetX - originalWidth, y: originalPosition.y + (index - 5) * offsetY };
            start = {
              x: originalPosition.x, // Left side of the original text box
              y: originalPosition.y + (originalHeight / 2), // Vertical middle of the original text box
            };
            end = {
              x: position.x + originalWidth,
              y: position.y + (originalHeight / 2), // Vertical middle of the new text box
            };
          }

          console.log('Creating shape with text:', question); // Debug: Log the text being passed to createShapes

          const newTextShapeId = createShapeId();
          const newArrowId = createShapeId();

          // Store the arrow binding
          arrowBindings.current.push({
            arrowId: newArrowId,
            startShapeId: originalShape.id,
            endShapeId: newTextShapeId,
          });

          // Create the text shape and arrow shape
          return editor.createShapes([
            {
              id: newTextShapeId,
              type: 'text',
              x: position.x,
              y: position.y,
              props: { text: question },
            },
            {
              id: newArrowId,
              type: 'arrow',
              props: {
                start,
                end,
              }
            }
          ]);
        });

        await Promise.all(createShapesPromises);

        console.log('All shapes created');
        updateArrows();
      } else {
        console.error('No questions generated.');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  };

  const updateArrows = () => {
    const updateShapesPromises = arrowBindings.current.map((binding) => {
      const startShape = editor.getShape(binding.startShapeId);
      const endShape = editor.getShape(binding.endShapeId);

      if (startShape && endShape) {
        const startX = startShape.x + (startShape.props.width || 200);
        const startY = startShape.y + ((startShape.props.height || 50) / 2);
        const endX = endShape.x;
        const endY = endShape.y + ((endShape.props.height || 50) / 2);

        return editor.updateShapes([
          {
            id: binding.arrowId,
            type: 'arrow',
            props: {
              start: { x: startX, y: startY },
              end: { x: endX, y: endY },
            }
          }
        ]);
      }
      return Promise.resolve();
    });

    Promise.all(updateShapesPromises).then(() => {
      console.log('All arrows updated');
    });
  };

  const handleNewTextClick = async (newText) => {
    const combinedText = `${originalText} ${newText}`;
    const newQuestions = await generateQuestions(combinedText, numQuestions);
    console.log('Generated further questions:', newQuestions); // Debug: Log the further generated questions

    // Further handling of new questions can be added here
  };

  return (
    <div>
      <DefaultContextMenu {...props}>
        <div style={{ backgroundColor: 'thistle' }}>
          <TldrawUiMenuItem
            id="like"
            label="Generate Questions"
            icon="external-link"
            readonlyOk
            onSelect={handleGenerateQuestions}
          />
        </div>
        <DefaultContextMenuContent />
      </DefaultContextMenu>
    </div>
  );
};

const components = {
  ContextMenu: CustomContextMenu,
};

export default components;
