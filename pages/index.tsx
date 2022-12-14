import type { NextPage } from 'next';
import Head from 'next/head';
import { HomePageContainer } from '../Module/HomePageContainer';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pokedex Adam</title>
        <meta name="description" content="Pokedex Adam" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePageContainer />
    </div>
  );
};

export default Home;
