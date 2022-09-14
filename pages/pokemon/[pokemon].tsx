import type { NextPage } from 'next';
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import { DetailPokemon } from '../../Module/DetailPokemonContainer';

const PokemonDetailPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pokedex Adam</title>
        <meta name="description" content="Pokedex Adam" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailPokemon />
    </div>
  );
};

export default PokemonDetailPage;
