import { Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { HomePageContainer } from '../Module/HomePageContainer';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex Adam</title>
        <meta name="description" content="Pokedex Adam" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>Welcome To Pokedex Adam</Heading>
      <HomePageContainer />
    </div>
  );
};

export default Home;
