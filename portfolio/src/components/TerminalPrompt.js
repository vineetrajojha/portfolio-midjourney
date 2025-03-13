import React from 'react';
import styles from './Terminal.module.css';

const TerminalPrompt = ({ path, value, onChange, onSubmit, onKeyDown, inputRef, env, isInitializing }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
    if (!isInitializing) {
      onKeyDown(e);
    }
  };

  if (isInitializing) {
    return (
      <div className={styles.terminalPrompt}>
        <span className={styles.terminalSymbol}>&gt;</span>
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
          placeholder="Enter your name"
        />
      </div>
    );
  }

  return (
    <div className={styles.terminalPrompt}>
      <span className={styles.terminalEnv}>{env.environment}</span>
      <span className={styles.terminalUser}>{env.user}@{env.machine}</span>
      <span className={styles.terminalPath}>{path}</span>
      <span className={styles.terminalSymbol}>%</span>
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