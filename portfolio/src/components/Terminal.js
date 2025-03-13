"use client";
import { useState, useEffect, useRef } from 'react';
import TerminalPrompt from './TerminalPrompt';
import TerminalOutput from './TerminalOutput';
import TerminalLoader from './TerminalLoader';
import ThemeToggle from './ThemeToggle';
import styles from './Terminal.module.css';
import { getSystemInfo } from '../utils/systemInfo';

const Terminal = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('terminal_theme') || 'dark';
    }
    return 'dark';
  });
  const [history, setHistory] = useState([
    { type: 'output', text: 'cres terminal portfolio v1.0' },
    { type: 'output', text: 'Please enter your name to continue:' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState(['~']);
  const [isInitializing, setIsInitializing] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Terminal environment info
  const [terminalEnv, setTerminalEnv] = useState({
    user: '',
    machine: '',
    environment: '(base)',
  });

  // Add admin user constant and password
  const ADMIN_USER = 'vineetcres';
  const ADMIN_PASSWORD = 'Roshni/22@';

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
      setHistory([
        { type: 'output', text: 'Welcome to my cres terminal portfolio v1.0' },
        { type: 'output', text: 'Please enter your name to continue:' }
      ]);
    }, 4000); // Show loader for 4 seconds

    const systemInfo = getSystemInfo();
    if (systemInfo.username) {
      setTerminalEnv(prev => ({
        ...prev,
        user: systemInfo.username,
        machine: `${systemInfo.deviceName}`,
      }));
      setIsInitializing(false);
    }
  }, []);

  // Add theme effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    localStorage.setItem('terminal_theme', theme);

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (theme === 'system') {
        root.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // File system structure
  const fileSystem = {
    '~': {
      type: 'dir',
      contents: {
        'about': { type: 'file', content: 'Hi, I\'m Vineet!\n\nI\'m an AI Engineer specializing in web and AI solutions.\n\nWith years of experience in development, I\'m passionate about creating intuitive and efficient digital experiences.' },
        'projects': { type: 'dir', contents: {
          'web-ease': { type: 'file', content: 'WebEase - A platform for students to collaborate and find paid projects.\nTech: MERN Stack\nLink: https://github.com/vineet/project1' },
          'ai-quality': { type: 'file', content: 'AI-Powered Quality Control - Automating defect detection in manufacturing.\nTech: Python, TensorFlow\nLink: https://github.com/vineet/project2' }
        }},
        'social': { type: 'file', content: 'Connect with me:\n\n- GitHub: https://github.com/vineet\n- LinkedIn: https://linkedin.com/in/vineet\n- Twitter: https://twitter.com/vineet\n- Email: vineet@example.com' },
        'themes': { type: 'dir', contents: {
          'minecraft': { type: 'file', content: 'Minecraft theme for portfolio' }
        }},
        'messages': { type: 'dir', contents: {} }
      }
    }
  };

  // Load saved messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('terminal_messages');
    if (savedMessages) {
      fileSystem['~'].contents.messages.contents = JSON.parse(savedMessages);
    }
  }, []);

  const getCurrentDir = () => {
    let current = fileSystem;
    for (const dir of currentPath) {
      if (dir === '~') {
        current = fileSystem['~'];
      } else {
        current = current.contents[dir];
      }
    }
    return current;
  };

  const handleCommand = (command) => {
    if (isInitializing) {
      // Handle the username input
      const username = command.trim();
      if (username) {
        if (username.toLowerCase() === ADMIN_USER.toLowerCase()) {
          setHistory(prev => [
            ...prev,
            { type: 'command', text: username },
            { type: 'output', text: 'This username requires authentication. Please enter the password:' }
          ]);
          setInputValue('');
          return;
        }
        
        localStorage.setItem('terminal_username', username);
        const systemInfo = getSystemInfo();
        setTerminalEnv(prev => ({
          ...prev,
          user: username,
          machine: `${systemInfo.deviceName}`,
        }));
        setIsInitializing(false);
        setHistory(prev => [
          ...prev,
          { type: 'command', text: username },
          { type: 'output', text: `Welcome, ${username}! Type "help" to see available commands.` }
        ]);
      }
      setInputValue('');
      return;
    }

    // Check if we're waiting for admin password during initialization
    if (history[history.length - 1]?.text === 'This username requires authentication. Please enter the password:') {
      const password = command.trim();
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('terminal_username', ADMIN_USER);
        const systemInfo = getSystemInfo();
        setTerminalEnv(prev => ({
          ...prev,
          user: ADMIN_USER,
          machine: `${systemInfo.deviceName}`,
        }));
        setIsInitializing(false);
        setHistory(prev => [
          ...prev,
          { type: 'command', text: '********' }, // Mask the password in history
          { type: 'output', text: `Welcome, ${ADMIN_USER}! Type "help" to see available commands.` }
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'command', text: '********' }, // Mask the password in history
          { type: 'output', text: 'Authentication failed. Please enter a different username:' }
        ]);
      }
      setInputValue('');
      return;
    }

    const fullPrompt = `${terminalEnv.environment} ${terminalEnv.user}@${terminalEnv.machine} ${currentPath.join('/')} %`;
    setHistory(prev => [...prev, { type: 'command', text: `${fullPrompt} ${command}` }]);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    const [cmd, ...args] = command.trim().split(' ');
    const cmdLower = cmd.toLowerCase();
    
    if (cmdLower === '') {
      return;
    } else if (cmdLower === 'help') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: `Available commands:\n- cd <directory> - Change directory\n- ls - List directory contents\n- cat <file> - Display file contents\n- pwd - Print working directory\n- clear - Clear terminal\n- message <text> - Leave a message for Vineet\n- messages - View messages (admin only)\n- login - Admin authentication\n- logout - End admin session\n- portfolio themes - Show available themes\n- about - About me\n- projects - My projects\n- social - Social links` 
      }]);
    } else if (cmdLower === 'login') {
      const password = args[0];
      if (!password) {
        setHistory(prev => [...prev, { type: 'output', text: 'Usage: login <password>' }]);
        return;
      }
      
      if (password === ADMIN_PASSWORD) {
        setTerminalEnv(prev => ({
          ...prev,
          user: ADMIN_USER,
        }));
        setHistory(prev => [...prev, { type: 'output', text: 'Successfully logged in as admin.' }]);
      } else {
        setHistory(prev => [...prev, { type: 'output', text: 'Authentication failed: Incorrect password.' }]);
      }
    } else if (cmdLower === 'logout') {
      if (terminalEnv.user === ADMIN_USER) {
        const systemInfo = getSystemInfo();
        setTerminalEnv(prev => ({
          ...prev,
          user: systemInfo.username || '',
        }));
        setHistory(prev => [...prev, { type: 'output', text: 'Successfully logged out from admin session.' }]);
      } else {
        setHistory(prev => [...prev, { type: 'output', text: 'You are not logged in as admin.' }]);
      }
    } else if (cmdLower === 'message') {
      const messageText = args.join(' ').trim();
      if (!messageText) {
        setHistory(prev => [...prev, { type: 'output', text: 'Please provide a message to save' }]);
        return;
      }

      const timestamp = new Date().toISOString();
      const messageId = `message_${timestamp}`;
      const messageContent = `From: ${terminalEnv.user}@${terminalEnv.machine}\nDate: ${new Date().toLocaleString()}\nMessage: ${messageText}`;
      
      // Save message to fileSystem
      fileSystem['~'].contents.messages.contents[messageId] = {
        type: 'file',
        content: messageContent
      };

      // Persist messages to localStorage
      localStorage.setItem('terminal_messages', JSON.stringify(fileSystem['~'].contents.messages.contents));

      setHistory(prev => [...prev, { 
        type: 'output', 
        text: 'Message sent successfully! Note: Only Vineet can view the messages, but your message has been saved.' 
      }]);
    } else if (cmdLower === 'messages') {
      if (terminalEnv.user === ADMIN_USER) {
        // Load messages from localStorage to ensure we have the latest
        const savedMessages = localStorage.getItem('terminal_messages');
        if (savedMessages) {
          fileSystem['~'].contents.messages.contents = JSON.parse(savedMessages);
        }
        
        const messages = Object.values(fileSystem['~'].contents.messages.contents);
        if (messages.length === 0) {
          setHistory(prev => [...prev, { type: 'output', text: 'No messages yet.' }]);
        } else {
          const messagesList = messages.map(msg => msg.content).join('\n\n---\n\n');
          setHistory(prev => [...prev, { type: 'output', text: 'Messages:\n\n' + messagesList }]);
        }
      } else {
        setHistory(prev => [...prev, { 
          type: 'output', 
          text: 'Permission denied: Only Vineet has access to view messages. Use "login" command to authenticate as admin.' 
        }]);
      }
    } else if (cmdLower === 'cd') {
      const target = args[0];
      if (!target) {
        setHistory(prev => [...prev, { type: 'output', text: 'Please specify a directory' }]);
        return;
      }
      
      const current = getCurrentDir();
      if (target === '..') {
        if (currentPath.length > 1) {
          setCurrentPath(prev => prev.slice(0, -1));
          setHistory(prev => [...prev, { type: 'output', text: '' }]);
        }
      } else if (current.contents[target]?.type === 'dir') {
        setCurrentPath(prev => [...prev, target]);
        setHistory(prev => [...prev, { type: 'output', text: '' }]);
      } else {
        setHistory(prev => [...prev, { type: 'output', text: `cd: no such directory: ${target}` }]);
      }
    } else if (cmdLower === 'ls') {
      const current = getCurrentDir();
      const contents = Object.keys(current.contents);
      setHistory(prev => [...prev, { type: 'output', text: contents.join('  ') }]);
    } else if (cmdLower === 'cat') {
      const target = args[0];
      if (!target) {
        setHistory(prev => [...prev, { type: 'output', text: 'Please specify a file' }]);
        return;
      }
      
      const current = getCurrentDir();
      if (current.contents[target]?.type === 'file') {
        setHistory(prev => [...prev, { type: 'output', text: current.contents[target].content }]);
      } else {
        setHistory(prev => [...prev, { type: 'output', text: `cat: no such file: ${target}` }]);
      }
    } else if (cmdLower === 'pwd') {
      setHistory(prev => [...prev, { type: 'output', text: currentPath.join('/') }]);
    } else if (cmdLower === 'clear') {
      setHistory([]);
    } else if (cmdLower === 'about') {
      setHistory(prev => [...prev, { type: 'output', text: fileSystem['~'].contents.about.content }]);
    } else if (cmdLower === 'projects') {
      setHistory(prev => [...prev, { type: 'output', text: 'Available projects:\n\n' + 
        Object.entries(fileSystem['~'].contents.projects.contents)
          .map(([name, project]) => `${name}:\n${project.content}`)
          .join('\n\n')
      }]);
    } else if (cmdLower === 'social') {
      setHistory(prev => [...prev, { type: 'output', text: fileSystem['~'].contents.social.content }]);
    } else if (cmdLower === 'portfolio' && args[0] === 'themes') {
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: 'Available themes:\n' + 
          Object.keys(fileSystem['~'].contents.themes.contents).join('\n')
      }]);
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
      className={`${styles.terminal} ${theme === 'light' ? styles.light : ''}`}
      onClick={() => inputRef.current?.focus()}
      ref={terminalRef}
    >
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtons}>
          <div className={styles.terminalButton} style={{ backgroundColor: '#FF5F56' }}></div>
          <div className={styles.terminalButton} style={{ backgroundColor: '#FFBD2E' }}></div>
          <div className={styles.terminalButton} style={{ backgroundColor: '#27C93F' }}></div>
        </div>
        <div className={styles.terminalTitle}>
          {isInitializing ? 'Welcome' : `terminal/portfolio@${terminalEnv.user}`}
        </div>
      </div>
      
      <div className={styles.terminalBody}>
        {loading ? (
          <TerminalLoader />
        ) : (
          <>
            {history.map((item, i) => (
              <div key={i}>
                {item.type === 'command' 
                  ? <div className={styles.terminalCommand}>{item.text}</div> 
                  : <TerminalOutput text={item.text} />
                }
              </div>
            ))}
            
            <TerminalPrompt 
              path={currentPath.join('/')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSubmit={() => handleCommand(inputValue)}
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
              env={terminalEnv}
              isInitializing={isInitializing}
            />
          </>
        )}
      </div>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Terminal;