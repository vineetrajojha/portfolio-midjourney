import React, { useEffect, useState } from 'react';
import styles from './TerminalLoader.module.css';

const TerminalLoader = () => {
  const [frame, setFrame] = useState(0);
  
  const frames = [
`
╔════════════════════════════════════════╗
║ Initializing System...                 ║
║ ▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░ 25%   ║
║                                        ║
║ > Loading modules                      ║
║ > Checking dependencies                ║
║ > Establishing connection              ║
╚════════════════════════════════════════╝`,

`
╔════════════════════════════════════════╗
║ System Preparation...                  ║
║ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░ 40%   ║
║                                        ║
║ > Modules loaded                       ║
║ > Dependencies verified                ║
║ > Connection established...            ║
╚════════════════════════════════════════╝`,

`
╔════════════════════════════════════════╗
║ Configuring Environment...             ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░ 60%    ║
║                                        ║
║ > Environment variables set            ║
║ > Security protocols enabled           ║
║ > Optimizing performance              ║
╚════════════════════════════════════════╝`,

`
╔════════════════════════════════════════╗
║ Final Preparations...                  ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░ 75%    ║
║                                        ║
║ > Cache initialized                    ║
║ > Resources allocated                  ║
║ > Systems synchronized                 ║
╚════════════════════════════════════════╝`,

`
╔════════════════════════════════════════╗
║ Launch Sequence Complete               ║
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%   ║
║                                        ║
║ > All systems operational             ║
║ > Terminal ready                      ║
║ > cres Terminal v1.0               ║
╚════════════════════════════════════════╝`
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 800); // Change frame every 800ms

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.loader}>
      <pre className={styles.ascii}>{frames[frame]}</pre>
    </div>
  );
};

export default TerminalLoader; 