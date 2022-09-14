import { Badge, HStack } from '@chakra-ui/react';
import { PokemonType } from '../Module/HomePageContainer';

type Props = {
  pokemonType: Array<PokemonType>;
};

function PokemonTypeBadge({ pokemonType }: Props) {
  return (
    <HStack>
      {pokemonType[0].pokemon_type.map((type, index) => (
        <Badge key={`${type.type.name} ${index} `} variant="solid">
          {type.type.name}
        </Badge>
      ))}
    </HStack>
  );
}

export { PokemonTypeBadge };
