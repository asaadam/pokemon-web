import { gql, useQuery } from '@apollo/client';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { VStack, Spinner, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PokemonDetailViewer } from '../component/PokemonDetail';
import { PokemonPreview } from '../component/PokemonPreview';
import { PokemonDetail } from './DetailPokemonContainer';

const getPokemonComparasion = gql`
  query getPokemonDetail($pokemonName: [String!]) {
    pokemonList: pokemon_v2_pokemonspecies(
      order_by: { id: asc }
      limit: 2
      where: { name: { _in: $pokemonName } }
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

function PokemonComparasion() {
  const router = useRouter();

  const { loading, error, data } = useQuery<
    {
      pokemonList: Array<PokemonDetail>;
    },
    {
      pokemonName: Array<string>;
    }
  >(getPokemonComparasion, {
    variables: {
      pokemonName: [
        router.query.pokemon1 as string,
        router.query.pokemon2 as string,
      ],
    },
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
        <HStack>
          <VStack>
            <PokemonPreview pokemon={data.pokemonList[0]} />
            <PokemonDetailViewer
              pokemonDetail={data.pokemonList[0]}
              isCompare
            />
          </VStack>
          <VStack>
            <PokemonPreview pokemon={data.pokemonList[1]} />
            <PokemonDetailViewer
              pokemonDetail={data.pokemonList[1]}
              isCompare
            />
          </VStack>
        </HStack>
      )}
    </VStack>
  );
}

export { PokemonComparasion };
