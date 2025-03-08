import React from 'react';
import styles from './Terminal.module.css';

const TerminalOutput = ({ text }) => {
  // Process text to handle new lines
  const lines = text.split('\n').map((line, i) => (
    <div key={i} className={styles.terminalOutputLine}>{line}</div>
  ));

  return <div className={styles.terminalOutput}>{lines}</div>;
};

export default TerminalOutput;