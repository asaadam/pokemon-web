import { gql, useQuery } from '@apollo/client';
import {
  Button,
  Checkbox,
  Grid,
  HStack,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import error from 'next/error';
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
  const [compare, setCompare] = useState<Array<string>>([]);
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
  const toast = useToast();

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
      <HStack>
        <PokemonFilterContainer />
        {compare.length && (
          <Button
            onClick={() => {
              if (compare.length < 2) {
                return toast({
                  title: 'Error',
                  status: 'error',
                  description: 'Select one more',
                });
              }
              router.push(`/compare/${compare[0]}/${compare[1]}`);
            }}
            colorScheme="blue"
          >
            Compare
          </Button>
        )}
      </HStack>
      <Grid w="100%" maxWidth={'2xl'} templateColumns="repeat(2, 1fr)" gap={2}>
        {data?.pokemonList.map((pokemon, index) => {
          return (
            <VStack key={pokemon.id}>
              <Checkbox
                isChecked={
                  compare.find((val) => val === pokemon.name) ? true : false
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    if (compare.length === 2) {
                      return toast({
                        title: 'Error',
                        status: 'error',
                        description: 'Maximum 2 pokemon',
                      });
                    }
                    setCompare((v) => [...v, pokemon.name]);
                  } else {
                    setCompare((v) =>
                      v.filter((value) => value !== pokemon.name)
                    );
                  }
                }}
              >
                Select To Compare
              </Checkbox>
              <PokemonPreview
                ref={
                  data.pokemonList.length === index + 1
                    ? lastDataRef
                    : undefined
                }
                pokemon={pokemon}
              />
            </VStack>
          );
        })}
      </Grid>
      {loading && <Spinner />}
      {error && <Text>{error.stack}</Text>}
    </VStack>
  );
}

export { HomePageContainer };
export type { PokemonData, PokemonType };
