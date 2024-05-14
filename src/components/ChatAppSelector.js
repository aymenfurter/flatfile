import React from 'react';
import '../styles/components/ChatAppSelector.css';

function ChatAppSelector({ selectedChatApp, onChatAppChange }) {
  const handleChange = (event) => {
    onChatAppChange(event.target.value);
  };

  return (
    <div className="chat-app-selector">
      <h2>Select Chat App</h2>
      <select value={selectedChatApp} onChange={handleChange}>
        <option value="chatgpt">ChatGPT (~15,000 characters)</option>
        <option value="meta">meta.ai (~10,000 characters)</option>
        <option value="claude">claude3 (~2 MB)</option>
      </select>
    </div>
  );
}

export default ChatAppSelector;