import { VStack, Text, Badge, GridItem, Heading } from '@chakra-ui/react';
import Image, { ImageLoaderProps } from 'next/image';
import { PokemonData, PokemonType } from '../Module/HomePageContainer';
import React from 'react';
import { PokemonTypeBadge } from './PokemonTypeBadge';
import Link from 'next/link';

const imageUrl = ({ src }: ImageLoaderProps) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${src}.png`;
};

type Props = {
  pokemon: PokemonData<PokemonType>;
};

const PokemonPreview = React.forwardRef<HTMLDivElement, Props>(
  ({ pokemon }, ref) => (
    <Link href={`/pokemon/${pokemon.name}`}>
      <GridItem
        data-testid="pokemonBackground"
        cursor={'pointer'}
        mx="auto"
        ref={ref}
        w="100%"
        maxWidth={'sm'}
        py="2"
        bg={`pokemon${pokemon.color.name}`}
        mt={4}
        borderRadius="2xl"
      >
        <VStack justifyContent="center" w="100%" color={'black'}>
          <Heading size={'sm'}>
            {`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`}
          </Heading>
          <Image
            loader={imageUrl}
            src={pokemon.id.toString()}
            width={100}
            height={100}
            alt="test"
          />
          <PokemonTypeBadge pokemonType={pokemon.pokemons_detail} />
        </VStack>
      </GridItem>
    </Link>
  )
);

PokemonPreview.displayName = 'PokemonPreview';

export { PokemonPreview };
