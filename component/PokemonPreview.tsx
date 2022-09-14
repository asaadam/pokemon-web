import { VStack, Text, Badge, GridItem } from '@chakra-ui/react';
import Image, { ImageLoaderProps } from 'next/image';
import { PokemonData } from '../Module/HomePageContainer';
import React from 'react';
import { PokemonTypeBadge } from './PokemonTypeBadge';

const imageUrl = ({ src }: ImageLoaderProps) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${src}.png`;
};

type Props = {
  pokemon: PokemonData;
};

const PokemonPreview = React.forwardRef<HTMLDivElement, Props>(
  ({ pokemon }, ref) => (
    <GridItem
      mx="auto"
      ref={ref}
      w="100%"
      maxWidth={'sm'}
      py="2"
      bg={pokemon.color.name}
      mt={4}
      borderRadius="2xl"
    >
      <VStack justifyContent="center" w="100%" color={'black'}>
        <Text>{pokemon.name} </Text>
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
  )
);

PokemonPreview.displayName = 'PokemonPreview';

export { PokemonPreview };
