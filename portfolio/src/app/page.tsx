import Head from 'next/head';
import Terminal from '../components/Terminal';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>cres</title>
        <meta name="description" content="terminal/portfolio@cres" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
        
      </Head>

      <main className={styles.main}>
        <Terminal />
      </main>
    </div>
  );
}
