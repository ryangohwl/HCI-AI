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

function CustomContextMenu(props: TLUiContextMenuProps) {
  const editor = useEditor();
  return (
    <div>
      <DefaultContextMenu {...props}>
        <div style={{ backgroundColor: "thistle" }}>
          <TldrawUiMenuItem
            id="generate-questions"
            label="Generate Questions"
            icon="external-link"
            readonlyOk
            onSelect={() => {
              editor.createShapes([
                { id: createShapeId(), type: "text", props: { text: "Generated Question" } },
              ]);
            }}
          />
          <TldrawUiMenuItem
            id="generate-answers"
            label="Generate Answers"
            icon="external-link"
            readonlyOk
            onSelect={() => {
              editor.createShapes([
                { id: createShapeId(), type: "text", props: { text: "Generated Answer" } },
              ]);
            }}
          />
          <TldrawUiMenuItem
            id="generate-ideas"
            label="Generate Ideas"
            icon="external-link"
            readonlyOk
            onSelect={() => {
              editor.createShapes([
                { id: createShapeId(), type: "text", props: { text: "Generated Idea" } },
              ]);
            }}
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
