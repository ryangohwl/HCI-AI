import React from 'react';

const CustomToolbar = ({ onSelectTool }) => {
  const tools = [
    { id: 'select', name: 'Select', icon: '/path/to/select-icon.svg' },
    { id: 'text', name: 'Text Box', icon: '/path/to/textbox-icon.svg' },
    { id: 'eraser', name: 'Eraser', icon: '/path/to/eraser-icon.svg' },
    { id: 'arrow', name: 'Arrow', icon: '/path/to/arrow-icon.svg' },
    { id: 'rectangle', name: 'Rectangle', icon: '/path/to/rectangle-icon.svg' },
    { id: 'highlighter', name: 'Highlighter', icon: '/path/to/highlighter-icon.svg' },
    { id: 'multimedia', name: 'Multimedia', icon: '/path/to/multimedia-icon.svg' },
  ];

  return (
    <div className="custom-toolbar">
      {tools.map(tool => (
        <button key={tool.id} onClick={() => onSelectTool(tool.id)} title={tool.name}>
          <img src={tool.icon} alt={tool.name} />
        </button>
      ))}
    </div>
  );
};

export default CustomToolbar;
