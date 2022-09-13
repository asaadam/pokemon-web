import { VStack, Text, Badge } from '@chakra-ui/react';
import Image, { ImageLoaderProps } from 'next/image';
import { PokemonData } from '../Module/HomePageContainer';
import React from 'react';

const imageUrl = ({ src }: ImageLoaderProps) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${src}.png`;
};

type Props = {
  pokemon: PokemonData;
};

const PokemonPreview = React.forwardRef<HTMLDivElement, Props>(
  ({ pokemon }, ref) => (
    <div ref={ref}>
      <VStack
        justifyContent="center"
        width={300}
        height={300}
        backgroundColor={pokemon.color}
        color={'black'}
      >
        <Text>{pokemon.name} </Text>
        <Image
          loader={imageUrl}
          src={pokemon.id.toString()}
          width={100}
          height={100}
          alt="test"
        />

        <Badge variant="solid">Success</Badge>
      </VStack>
    </div>
  )
);

PokemonPreview.displayName = 'PokemonPreview';

export { PokemonPreview };
