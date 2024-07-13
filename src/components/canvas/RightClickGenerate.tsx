import React, { useState } from 'react';
import {
  ContextMenu,
  DefaultContextMenu,
  DefaultContextMenuContent,
  TLComponents,
  TLUiContextMenuProps,
  TldrawUiMenuItem,
  createShapeId,
  useEditor,
} from 'tldraw';
import 'tldraw/tldraw.css';
import { useSelectedText } from './GetSelectedText'; // Import the custom hook
import { generateQuestions } from './rightclickchatbot'; // Adjust the import path

type ShapeProps = {
  width?: number;
  height?: number;
};

type Shape = {
  id: string;
  x: number;
  y: number;
  props: ShapeProps;
};

function CustomContextMenu(props: TLUiContextMenuProps) {
  const editor = useEditor();
  const [numQuestions, setNumQuestions] = useState(10);
  const selectedText = useSelectedText(); // Use the custom hook

  const handleGenerateQuestions = async () => {
    if (!selectedText) {
      console.error('No text found for generating questions.');
      return;
    }

    const questions = await generateQuestions(selectedText, numQuestions);
    console.log('Generated questions:', questions); // Debug: Log the generated questions

    if (questions.length > 0) {
      // Get the position of the original text box
      const selectedShapes = editor.getSelectedShapes() as Shape[];
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

      questions.forEach((question: string, index: number) => {
        let position;
        let start;
        let end;
        if (index < 5) {
          // Position to the right
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
          // Position to the left
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

        // Create the text shape
        editor.createShapes([
          {
            id: newTextShapeId,
            type: 'text',
            x: position.x,
            y: position.y,
            props: { text: question },
          }
        ]);

        console.log(`Created shape at position (${position.x}, ${position.y}) with text: ${question}`); // Debug: Confirm shape creation

        // Create the arrow shape
        editor.createShapes([
          {
            id: createShapeId(),
            type: 'arrow',
            props: {
              start,
              end,
            }
          }
        ]);

        console.log(`Created arrow from (${start.x}, ${start.y}) to (${end.x}, ${end.y})`); // Debug: Confirm arrow creation
      });
    } else {
      console.error('No questions generated.');
    }
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
}

const components: TLComponents = {
  ContextMenu: CustomContextMenu,
};

export default components;
