import React, { useState } from 'react';
import Header from '../components/Header';
import FileSelector from '../components/FileSelector';
import ChatAppSelector from '../components/ChatAppSelector';
import IgnorePatternConfig from '../components/IgnorePatternConfig';
import ProgressBar from '../components/ProgressBar';
import DownloadButton from '../components/DownloadButton';
import Footer from '../components/Footer';
import { selectDirectory, readFiles, generateFatFile } from '../utils/fileSystemAccess';
import { applyIgnorePatterns, enforceSizeLimit } from '../utils/fileProcessor';
import '../styles/components/HomePage.css';

function HomePage() {
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [selectedChatApp, setSelectedChatApp] = useState('chatgpt');
  const [selectedEnvironment, setSelectedEnvironment] = useState('nodejs');
  const [progress, setProgress] = useState(0);
  const [fatFile, setFatFile] = useState(null);

  const handleDirectorySelect = async () => {
    const directory = await selectDirectory();
    setSelectedDirectory(directory);
  };

  const handleChatAppChange = (chatApp) => {
    setSelectedChatApp(chatApp);
  };

  const handleEnvironmentChange = (environment) => {
    setSelectedEnvironment(environment);
  };

  const handleGenerateFatFile = async () => {
    if (selectedDirectory) {
      const files = await readFiles(selectedDirectory);
      const filteredFiles = applyIgnorePatterns(files, selectedEnvironment);
      const fatFileContent = await generateFatFile(filteredFiles);
      const limitedContent = enforceSizeLimit(fatFileContent, selectedChatApp);
      const file = new Blob([limitedContent], { type: 'text/plain' });
      setFatFile(file);
      setProgress(100);
    }
  };

  const handleDownload = () => {
    if (fatFile) {
      const url = URL.createObjectURL(fatFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'fat-file.txt';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="home-page">
      <Header />
      <main>
        <FileSelector onDirectorySelect={handleDirectorySelect} />
        <ChatAppSelector selectedChatApp={selectedChatApp} onChatAppChange={handleChatAppChange} />
        <IgnorePatternConfig selectedEnvironment={selectedEnvironment} onEnvironmentChange={handleEnvironmentChange} />
        <button onClick={handleGenerateFatFile} disabled={!selectedDirectory}>
        💾 Generate FAT FILE
        </button>
        <ProgressBar progress={progress} />
        <DownloadButton onDownload={handleDownload} disabled={!fatFile} />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;