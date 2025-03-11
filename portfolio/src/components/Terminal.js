"use client";
import { useState, useEffect, useRef } from 'react';
import TerminalPrompt from './TerminalPrompt';
import TerminalOutput from './TerminalOutput';
import styles from './Terminal.module.css';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'hi this is vineet and i build stuffs' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath] = useState('~');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const handleCommand = (command) => {
    setHistory(prev => [...prev, { type: 'command', text: `${currentPath}$ ${command}` }]);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    const cmd = command.trim().toLowerCase();
    
    if (cmd === '') {
      return;
    } else if (cmd === 'help') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Available commands:\n- portfolio themes\n- about\n- projects\n- social\n- clear\n` 
      }]);
    } else if (cmd === 'about') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Hi, I'm Vineet!\n\nI'm an AI Engineer specializing in web and AI solutions.\n\nWith years of experience in development, I'm passionate about creating intuitive and efficient digital experiences.` 
      }]);
    } else if (cmd === 'projects') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `My Projects:\n\n1. WebEase - A platform for students to collaborate and find paid projects.\n   Tech: MERN Stack\n   Link: github.com/vineet/project1\n\n2. AI-Powered Quality Control - Automating defect detection in manufacturing.\n   Tech: Python, TensorFlow\n   Link: github.com/vineet/project2` 
      }]);
    } else if (cmd === 'social') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Connect with me:\n\n- GitHub: github.com/vineet\n- LinkedIn: linkedin.com/in/vineet\n- Twitter: twitter.com/vineet\n- Email: vineet@example.com` 
      }]);
    } else if (cmd === 'portfolio themes') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Available themes: minecraft` 
      }]);
    } else if (cmd === 'clear') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Command not found: ${cmd}. Type "help" to see available commands.` 
      }]);
    }
    
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div 
      className={styles.terminal} 
      onClick={() => inputRef.current.focus()}
      ref={terminalRef}
    >
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtons}>
          <div className={styles.terminalButton} style={{ backgroundColor: '#FF5F56' }}></div>
          <div className={styles.terminalButton} style={{ backgroundColor: '#FFBD2E' }}></div>
          <div className={styles.terminalButton} style={{ backgroundColor: '#27C93F' }}></div>
        </div>
        <div className={styles.terminalTitle}>terminal/portfolio@vineet</div>
      </div>
      
      <div className={styles.terminalBody}>
        {history.map((item, i) => (
          <div key={i}>
            {item.type === 'command' 
              ? <div className={styles.terminalCommand}>{item.text}</div> 
              : <TerminalOutput text={item.text} />
            }
          </div>
        ))}
        
        <TerminalPrompt 
          path={currentPath}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={() => handleCommand(inputValue)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};

export default Terminal;