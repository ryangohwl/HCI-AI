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

  const handleGenerate = async (generateFunction: GenerateFunction, numItems: number) => {
    const selectedText = selectedTexts.join(' '); // Combine all selected texts into one string

    if (selectedText) {
      try {
        const items = await generateFunction(selectedText, numItems);
        const itemsText = items.join('\n');

        editor.createShapes([
          { id: createShapeId(), type: "text", props: { text: itemsText } },
        ]);
      } catch (error) {
        console.error(`Error generating ${numItems}:`, error);
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
            onSelect={() => handleGenerate(generateQuestions, 10)}
          />
          <TldrawUiMenuItem
            id="generate-answers"
            label="Generate Answers"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate(generateAnswers, 10)}
          />
          <TldrawUiMenuItem
            id="generate-ideas"
            label="Generate Ideas"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate(generateIdeas, 10)}
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
