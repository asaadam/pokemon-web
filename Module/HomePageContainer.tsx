import { gql, useQuery } from '@apollo/client';
import { Grid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { PokemonPreview } from '../component/PokemonPreview';
import { PokemonFilterContainer } from './PokemonFilterContainer';

type PokemonType = {
  pokemon_type: Array<{
    type: {
      name: string;
    };
  }>;
};

type PokemonData<TypePokemon> = {
  color: {
    name: string;
  };
  id: number;
  name: string;
  is_mythical: boolean;
  is_legendary: boolean;
  pokemons_detail: Array<TypePokemon>;
};

type AllPokemonFilter = {
  offset: number;
  type: Array<string>;
  generation: Array<string>;
};

type AllPokemonResultType = {
  pokemonList: Array<PokemonData<PokemonType>>;
  species_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

function HomePageContainer() {
  const [offset, setOffset] = useState(0);
  const router = useRouter();
  const getPokemonData = gql`
    query getPokemonList(
      $offset: Int
      $type: [String!]
      $generation: [String!]
    ) {
      pokemonList: pokemon_v2_pokemonspecies(
        order_by: { id: asc }
        limit: 20
        offset: $offset
        where: {
        ${
          router.query.type
            ? `
          pokemon_v2_pokemons: {
            pokemon_v2_pokemontypes: {
              pokemon_v2_type: { name: { _in: $type } }
            }
          }`
            : ''
        }
        ${
          router.query.generation
            ? `          pokemon_v2_generation: { name: { _in: $generation } }`
            : ''
        }
        }
      ) {
        id
        name
        is_mythical
        is_legendary
        pokemons_detail: pokemon_v2_pokemons {
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
      species_aggregate: pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
    }
  `;
  const { loading, error, data, fetchMore } = useQuery<
    AllPokemonResultType,
    AllPokemonFilter
  >(getPokemonData, {
    variables: {
      offset: 0,
      generation: router.query.generation as Array<string>,
      type: router.query.type as Array<string>,
    },
  });
  const observer = useRef<IntersectionObserver | null>(null);

  const lastDataRef = useCallback(
    (node: HTMLHeadingElement | null) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          data?.species_aggregate.aggregate.count !== data?.pokemonList.length
        ) {
          setOffset((v) => {
            const current = v + 20;
            fetchMore({ variables: { offset: current } });
            return current;
          });
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, data, fetchMore]
  );

  return (
    <VStack>
      <PokemonFilterContainer />
      <Grid w="100%" maxWidth={'2xl'} templateColumns="repeat(2, 1fr)" gap={2}>
        {data?.pokemonList.map((pokemon, index) => {
          if (data.pokemonList.length === index + 1) {
            return (
              <PokemonPreview
                key={pokemon.id}
                ref={lastDataRef}
                pokemon={pokemon}
              />
            );
          }
          return <PokemonPreview pokemon={pokemon} key={pokemon.id} />;
        })}
      </Grid>
      {loading && <Spinner />}
      {error && <Text>{error.stack}</Text>}
    </VStack>
  );
}

export { HomePageContainer };
export type { PokemonData, PokemonType };
