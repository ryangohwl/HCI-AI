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
import { generateQuestions, generateAnswers, generateIdeas } from "./GenerateLLM"; // Correct import

function CustomContextMenu(props: TLUiContextMenuProps) {
  const editor = useEditor();

  const handleGenerate = async (type) => {
    const text = "Your input text here"; // Replace with your actual text source
    let results = [];

    switch (type) {
      case 'questions':
        results = await generateQuestions(text, 10);
        break;
      case 'answers':
        results = await generateAnswers(text, 10);
        break;
      case 'ideas':
        results = await generateIdeas(text, 10);
        break;
      default:
        break;
    }

    if (results.length) {
      // Get the original shape position (assumes you have a way to get the original shape)
      const originalShape = editor.selectedShapes[0];
      const { x, y, width, height } = originalShape.props;

      results.forEach((result, index) => {
        const isLeft = index < 5;
        const offsetIndex = isLeft ? index : index - 5;
        const offsetX = isLeft ? -width * 2 : width * 2;
        const offsetY = offsetIndex * (height + 10);

        editor.createShapes([
          {
            id: createShapeId(),
            type: "text",
            props: { text: `${index + 1}. ${result}` },
            x: x + offsetX,
            y: y + offsetY,
          },
        ]);
      });
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
            onSelect={() => handleGenerate('questions')}
          />
          <TldrawUiMenuItem
            id="generate-answers"
            label="Generate Answers"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate('answers')}
          />
          <TldrawUiMenuItem
            id="generate-ideas"
            label="Generate Ideas"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate('ideas')}
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
