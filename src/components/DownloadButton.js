import React from 'react';
import '../styles/components/DownloadButton.css';

function DownloadButton({ onDownload, disabled }) {
  return (
    <div className="download-button">
      <button onClick={onDownload} disabled={disabled}>
        Download File
      </button>
    </div>
  );
}

export default DownloadButton;