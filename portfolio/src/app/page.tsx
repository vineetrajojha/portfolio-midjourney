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
      </Head>

      <main className={styles.main}>
        <Terminal />
      </main>
    </div>
  );
}
