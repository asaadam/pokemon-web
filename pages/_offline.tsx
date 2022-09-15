import { NextPage } from 'next';
import Head from 'next/head';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pokedex Adam</title>
        <meta name="description" content="You're Offline" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Check your internet connection </AlertTitle>
      </Alert>
    </div>
  );
};

export default Home;
