import { gql, useQuery } from '@apollo/client';
import { Box, Grid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import { PokemonPreview } from '../component/PokemonPreview';

type PokemonType = {
  pokemon_type: Array<{
    type: {
      name: string;
    };
  }>;
};

type PokemonData = {
  color: {
    name: string;
  };
  id: number;
  name: string;
  is_mythical: boolean;
  is_legendary: boolean;
  pokemons_detail: Array<PokemonType>;
};

type AllPokemonFilter = {
  offset: number;
};

type AllPokemonResultType = {
  pokemonList: Array<PokemonData>;
  species_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

const getPokemonData = gql`
  query getPokemonList($offset: Int) {
    pokemonList: pokemon_v2_pokemonspecies(
      order_by: { id: asc }
      limit: 20
      offset: $offset
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

function HomePageContainer() {
  const [offset, setOffset] = useState(0);
  const { loading, error, data, fetchMore } = useQuery<
    AllPokemonResultType,
    AllPokemonFilter
  >(getPokemonData, {
    variables: { offset: 0 },
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
      <Grid w="100%" maxWidth={'2xl'} templateColumns="repeat(2, 1fr)" gap={2}>
        {data?.pokemonList.map((pokemon, index) => {
          if (data.pokemonList.length === index + 1) {
            return (
              <PokemonPreview
                ref={lastDataRef}
                pokemon={pokemon}
                key={pokemon.id}
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
