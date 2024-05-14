import React from 'react';
import '../styles/components/FileSelector.css';

function FileSelector({ onDirectorySelect }) {
  const handleClick = () => {
    onDirectorySelect();
  };

  return (
    <div className="file-selector">
      <h2>Select Directory</h2>
      <button onClick={handleClick}>📨 Choose Directory</button>
    </div>
  );
}

export default FileSelector;