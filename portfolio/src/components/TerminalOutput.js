import React from 'react';
import styles from './Terminal.module.css';

const TerminalOutput = ({ text }) => {
  // Process text to handle new lines and links
  const processLine = (line) => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = line.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.terminalLink}
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const lines = text.split('\n').map((line, i) => (
    <div key={i} className={styles.terminalOutputLine}>
      {processLine(line)}
    </div>
  ));

  return <div className={styles.terminalOutput}>{lines}</div>;
};

export default TerminalOutput;