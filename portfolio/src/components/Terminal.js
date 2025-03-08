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
  const [currentPath] = useState('~');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const handleCommand = (command) => {
    setHistory(prev => [...prev, { type: 'command', text: `${currentPath}$ ${command}` }]);

    // Process command
    const cmd = command.trim().toLowerCase();
    
    if (cmd === '') {
      // Empty command, just add a new line
      return;
    } else if (cmd === 'help') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Available commands:
- about
- projects
- social
- clear
` 
      }]);
    } else if (cmd === 'about') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Hi, I'm [Your Name]!
        
I'm a [Your Role/Title] specializing in [Your Skills].
        
With [X] years of experience in web development, I'm passionate about creating intuitive and efficient digital experiences.` 
      }]);
    } else if (cmd === 'projects') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `My Projects:
        
1. [Project Name] - [Brief Description]
   Tech: [Technologies Used]
   Link: github.com/yourusername/repo
        
2. [Project Name] - [Brief Description]
   Tech: [Technologies Used]
   Link: github.com/yourusername/repo
        
3. [Project Name] - [Brief Description]
   Tech: [Technologies Used]
   Link: github.com/yourusername/repo` 
      }]);
    } else if (cmd === 'social') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Connect with me:
        
- GitHub: github.com/yourusername
- LinkedIn: linkedin.com/in/yourusername
- Twitter: twitter.com/yourusername
- Email: your.email@example.com` 
      }]);
    } else if (cmd === 'clear') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Command not found: ${cmd}. Type "help" to see available commands.` 
      }]);
    }
    
    // Clear input
    setInputValue('');
  };

  const focusTerminal = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when component mounts or when terminal is clicked
  useEffect(() => {
    focusTerminal();
  }, []);

  return (
    <div 
      className={styles.terminal} 
      onClick={focusTerminal}
      ref={terminalRef}
    >
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtons}>
          <div className={styles.terminalButton} style={{ backgroundColor: '#FF5F56' }}></div>
          <div className={styles.terminalButton} style={{ backgroundColor: '#FFBD2E' }}></div>
          <div className={styles.terminalButton} style={{ backgroundColor: '#27C93F' }}></div>
        </div>
        <div className={styles.terminalTitle}>terminal/portfolio@cres</div>
      </div>
      
      <div className={styles.terminalBody}>
        {/* Previous commands and outputs */}
        {history.map((item, i) => (
          <div key={i}>
            {item.type === 'command' 
              ? <div className={styles.terminalCommand}>{item.text}</div> 
              : <TerminalOutput text={item.text} />
            }
          </div>
        ))}
        
        {/* Current input */}
        <TerminalPrompt 
          path={currentPath}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={() => handleCommand(inputValue)}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};

export default Terminal;
