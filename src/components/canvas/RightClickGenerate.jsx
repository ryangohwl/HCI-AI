import React from 'react';
import {
  ContextMenu,
  DefaultContextMenu,
  DefaultContextMenuContent,
  TldrawUiMenuItem,
  useEditor,
} from '@tldraw/tldraw';
import 'tldraw/tldraw.css';
import GetSelectedTexts, { handleGenerateItems } from './GetSelectedText'; // Ensure the path is correct
import { generateQuestions, generateAnswers, generateIdeas } from './GenerateLLM';

const CustomContextMenu = (props) => {
  const editor = useEditor(); // Ensure editor is accessible

  const handleGenerate = (generateFunction, numItems) => {
    const selectedText = editor.getSelectedShapes()
      .filter(shape => shape.type === 'text' && shape.props && shape.props.text)
      .map(shape => shape.props.text).join(' ');

    handleGenerateItems(editor, selectedText, generateFunction, numItems);
  };

  return (
    <div>
      <DefaultContextMenu {...props}>
        <div style={{ backgroundColor: '#F07857'}}>
          <TldrawUiMenuItem
            id="generate-questions"
            label="Generate Questions"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate(generateQuestions, 6)}
          />
          <TldrawUiMenuItem
            id="generate-answers"
            label="Generate Answers"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate(generateAnswers, 6)}
          />
          <TldrawUiMenuItem
            id="generate-ideas"
            label="Generate Ideas"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerate(generateIdeas, 6)}
          />
        </div>
        <DefaultContextMenuContent />
      </DefaultContextMenu>
      <GetSelectedTexts />
    </div>
  );
};



export default CustomContextMenu;
