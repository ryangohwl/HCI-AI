import {
  ContextMenu,
  DefaultContextMenu,
  DefaultContextMenuContent,
  TLComponents,
  TLUiContextMenuProps,
  Tldraw,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  createShapeId,
  useEditor,
} from "tldraw";

import "tldraw/tldraw.css";
import { generateQuestions, generateAnswers, generateIdeas } from './GenerateLLM'; // Import the generate functions
import useSelectedTexts from './GetSelectedText'; // Import useSelectedTexts

type GenerateFunction = (text: string, numItems: number) => Promise<string[]>;

function CustomContextMenu(props: TLUiContextMenuProps) {
  const editor = useEditor();
  const selectedTexts = useSelectedTexts(); // Use the custom hook to get selected texts
  const selectedText = selectedTexts.join(' '); // Combine all selected texts into one string

  console.log('Selected Texts:', selectedTexts); // Debug log

  const handleGenerate = async (generateFunction: GenerateFunction, numItems: number, text: string) => {
    if (text) {
      try {
        console.log("Generating items..."); // Debug log
        const items = await generateFunction(text, numItems);

        console.log('Generated items:', items); // Debug log

        if (items.length < numItems) {
          console.warn(`Expected ${numItems} items, but got ${items.length}`);
        }

        const spacing = 150; // Spacing between textboxes
        const baseX = 100; // Initial x position
        const baseY = 100; // Initial y position

        items.forEach((item, index) => {
          const positionX = baseX + (index % 2) * spacing; // Alternate between two columns
          const positionY = baseY + Math.floor(index / 2) * spacing; // Position in rows

          console.log(`Creating textbox at (${positionX}, ${positionY}) with text: ${item}`); // Debug log
          editor.createShapes([
            { id: createShapeId(), type: "text", props: { text: item }, x: positionX, y: positionY },
          ]);
        });

        console.log("Generation complete"); // Debug log
      } catch (error) {
        console.error(`Error generating ${numItems} items:`, error);
      }
    } else {
      console.warn('No text selected.');
    }
  };

  return (
    <div>
      <DefaultContextMenu {...props}>
        <div style={{ backgroundColor: "thistle" }}>
          <TldrawUiMenuItem
            id="generate-questions"
            label="Generate Questions"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate(generateQuestions, 10, selectedText)}
          />
          <TldrawUiMenuItem
            id="generate-answers"
            label="Generate Answers"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate(generateAnswers, 10, selectedText)}
          />
          <TldrawUiMenuItem
            id="generate-ideas"
            label="Generate Ideas"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate(generateIdeas, 10, selectedText)}
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
