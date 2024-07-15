import React, { useEffect, useState } from 'react';
import {
  ContextMenu,
  DefaultContextMenu,
  DefaultContextMenuContent,
  TldrawUiMenuItem,
  createShapeId,
  useEditor,
} from '@tldraw/tldraw';
import 'tldraw/tldraw.css';
import { generateQuestions, generateAnswers, generateIdeas } from './GenerateLLM';
import useSelectedTexts from './GetSelectedText';

const CustomContextMenu = (props) => {
  const editor = useEditor();
  const selectedTexts = useSelectedTexts();
  const [selectedText, setSelectedText] = useState('');

  const updateSelectedText = () => {
    console.log('Updating selected text from selectedTexts:', selectedTexts);
    if (selectedTexts.length > 0) {
      setSelectedText(selectedTexts.join(' '));
      console.log('Selected text set to:', selectedTexts.join(' '));
    } else {
      setSelectedText('');
      console.log('Selected text cleared');
    }
  };

  const handleClick = (event) => {
    console.log('Handling click at point:', { x: event.clientX, y: event.clientY });
    const shape = editor.getShapeAtPoint({ x: event.clientX, y: event.clientY });
    if (shape && shape.type === 'text') {
      editor.selectShape(shape.id);
      setSelectedText(shape.props.text);
      console.log('Shape selected and text set:', shape.props.text);
    } else {
      console.log('No text shape found at clicked point');
    }
  };

  useEffect(() => {
    updateSelectedText();
  }, [selectedTexts]);

  useEffect(() => {
    console.log('Adding event listeners');
    editor.on('pointerdown', handleClick);
    editor.on('selectionchange', updateSelectedText);

    return () => {
      console.log('Removing event listeners');
      editor.off('pointerdown', handleClick);
      editor.off('selectionchange', updateSelectedText);
    };
  }, [editor]);

  const handleGenerateItems = async (generateFunction, numItems) => {
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
        const offsetX = 20;
        const offsetY = 50;

        const createShapesPromises = items.map((item, index) => {
          const position = {
            x: originalPosition.x + originalWidth + offsetX,
            y: originalPosition.y + index * (originalHeight + offsetY),
          };

          console.log('Creating shape at position:', position, 'with text:', item);
          const newTextShapeId = createShapeId();

          return editor.createShapes([
            {
              id: newTextShapeId,
              type: 'text',
              x: position.x,
              y: position.y,
              props: { text: item },
            },
          ]);
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

  return (
    <div>
      <DefaultContextMenu {...props}>
        <div style={{ backgroundColor: 'thistle' }}>
          <TldrawUiMenuItem
            id="generate-questions"
            label="Generate Questions"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerateItems(generateQuestions, 10)}
          />
          <TldrawUiMenuItem
            id="generate-answers"
            label="Generate Answers"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerateItems(generateAnswers, 10)}
          />
          <TldrawUiMenuItem
            id="generate-ideas"
            label="Generate Ideas"
            icon="external-link"
            readonlyOk
            onSelect={() => handleGenerateItems(generateIdeas, 10)}
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
