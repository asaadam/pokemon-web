import { gql, useQuery } from '@apollo/client';
import { Spinner, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PokemonPreview } from '../component/PokemonPreview';
import { PokemonData, PokemonType } from './HomePageContainer';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { PokemonDetailViewer } from '../component/PokemonDetail';
import Link from 'next/link';

const getPokemonDetail = gql`
  query getPokemonDetail($pokemonName: String) {
    pokemonList: pokemon_v2_pokemonspecies(
      order_by: { id: asc }
      limit: 1
      where: { name: { _eq: $pokemonName } }
    ) {
      id
      name
      description: pokemon_v2_pokemonspeciesflavortexts(
        limit: 1
        where: { pokemon_v2_language: { name: { _eq: "en" } } }
      ) {
        text: flavor_text
      }
      is_mythical
      is_legendary
      base_happiness
      pokemon_stats: pokemon_v2_pokemons {
        height
        weight
        base_stats: pokemon_v2_pokemonstats {
          base_stat
          stat_name: pokemon_v2_stat {
            name
          }
        }
      }
      pokemons_detail: pokemon_v2_pokemons {
        pokemon_abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
        pokemon_type: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
      color: pokemon_v2_pokemoncolor {
        name
      }
    }
  }
`;

type AllPokemonFilter = {
  pokemonName: string;
};

type PokemonAbility = {
  pokemon_abilities: Array<{
    ability: {
      name: string;
    };
  }>;
};

type PokemonDetail = PokemonData<PokemonAbility & PokemonType> & {
  description: Array<{
    text: string;
  }>;
  pokemon_stats: Array<{
    height: number;
    weight: number;
    base_stats: Array<{
      base_stat: number;
      stat_name: {
        name: string;
      };
    }>;
  }>;
};

function DetailPokemon() {
  const router = useRouter();

  const { loading, error, data } = useQuery<
    { pokemonList: Array<PokemonDetail> },
    AllPokemonFilter
  >(getPokemonDetail, {
    variables: { pokemonName: router.query.pokemon as string },
  });

  return (
    <VStack maxW={'lg'} mx="auto" mt="4">
      <Link href="/" scroll={false}>
        <ArrowBackIcon
          cursor="pointer"
          fontSize={'24'}
          alignSelf={'flex-start'}
        />
      </Link>
      {loading && <Spinner />}
      {data && (
        <VStack>
          <PokemonPreview pokemon={data.pokemonList[0]} />
          <PokemonDetailViewer pokemonDetail={data.pokemonList[0]} />
        </VStack>
      )}
    </VStack>
  );
}

export { DetailPokemon };
export type { PokemonDetail };
