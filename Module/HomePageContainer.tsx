import { gql, useQuery } from '@apollo/client';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';

type PokemonData = {
  color: {
    name: string;
  };
  id: number;
  name: string;
  is_mythical: boolean;
  is_legendary: boolean;
  pokemon_detail: Array<{
    pokemon_type: Array<{
      type: {
        name: string;
      };
    }>;
  }>;
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
      limit: 100
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
  const { loading, error, data, fetchMore } = useQuery<
    AllPokemonResultType,
    AllPokemonFilter
  >(getPokemonData, {
    variables: { offset: 0 },
  });
  const observer = useRef<IntersectionObserver | null>(null);

  const lastBookElementRef = useCallback(
    (node: HTMLHeadingElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          data?.species_aggregate.aggregate.count !== data?.pokemonList.length
        ) {
          console.log('Hey');
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, data]
  );

  return (
    <div style={{ height: 100 }}>
      <Box>
        {data?.pokemonList.map((pokemon, index) => {
          if (data.pokemonList.length === index + 1) {
            return (
              <h1 ref={lastBookElementRef} key={pokemon.id}>
                {pokemon.name}
              </h1>
            );
          }
          return <h1 key={pokemon.id}>{pokemon.name}</h1>;
        })}
        {loading && <Spinner />}
        {error && <Text>{error.stack}</Text>}
      </Box>
    </div>
  );
}

export { HomePageContainer };
export type { PokemonData };
