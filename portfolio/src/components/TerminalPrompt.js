import React from 'react';
import styles from './Terminal.module.css';

const TerminalPrompt = ({ path, value, onChange, onSubmit, inputRef }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={styles.terminalPrompt}>
      <span className={styles.terminalPath}>{path}$</span>
      <input
        type="text"
        className={styles.terminalInput}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoFocus
        spellCheck="false"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
};

export default TerminalPrompt;