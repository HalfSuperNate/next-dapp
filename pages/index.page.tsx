import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import Wallet from './wallet.page';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Voodoo Mint</title>
        <meta name="description" content="The Voodoo Queen and Witch Dr. Is a NFT creation from the mad scientists at the Voodoo Labs. Intertwined madness and utility to holders." />
        <link href="/success.png" rel="icon" type="image/x-icon"/>
      </Head>

      <main className={styles.main}>
        <Wallet />
        
      </main>

      <footer className={styles.footer}>
        <a href="https://www.vacnft.xyz/" rel="noopener noreferrer" target="_blank">
          Voodoo Labs Website
        </a>
      </footer>
    </div>
  );
};

export default Home;
