import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PokemonComparasion } from '../../../Module/ComparePokemonContainer';

const PokemonComparasionPage: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Pokedex Adam</title>
        <meta name="description" content="Pokedex Adam" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonComparasion />
    </div>
  );
};

export default PokemonComparasionPage;
