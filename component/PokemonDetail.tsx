import { Heading, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import { stat } from 'fs';
import { PokemonDetail } from '../Module/DetailPokemonContainer';

type Props = {
  pokemonDetail: PokemonDetail;
};

function PokemonDetailViewer({ pokemonDetail }: Props) {
  return (
    <VStack>
      <VStack
        w="100%"
        borderRadius={'xl'}
        p="4"
        px="8"
        backgroundColor="honeydew"
      >
        <Heading size="md">Description</Heading>
        <Text>{pokemonDetail.description[0].text}</Text>
      </VStack>
      <VStack
        w="100%"
        borderRadius={'xl'}
        p="4"
        px="8"
        backgroundColor="honeydew"
        alignItems={'flex-start'}
      >
        <Heading alignSelf={'center'} size="md">
          Base Info
        </Heading>
        <Text>
          <b>Height:</b>{' '}
          {(pokemonDetail.pokemon_stats[0].height * 0.1)
            .toFixed(2)
            .replace(/\.?0+$/, '')}{' '}
          m
        </Text>
        <Text>
          <b>Weight:</b>{' '}
          {(pokemonDetail.pokemon_stats[0].weight * 0.1)
            .toFixed(2)
            .replace(/\.?0+$/, '')}{' '}
          kg
        </Text>
        <Text>
          <b>Ability:</b>{' '}
          {pokemonDetail.pokemons_detail[0].pokemon_abilities.map(
            (data, index) =>
              `${data.ability.name} ${
                index !==
                pokemonDetail.pokemons_detail[0].pokemon_abilities.length - 1
                  ? ','
                  : ''
              } `
          )}
        </Text>
      </VStack>
      <VStack
        w="100%"
        borderRadius={'xl'}
        p="4"
        px="8"
        backgroundColor="honeydew"
      >
        <Heading size="md">Base Stats</Heading>
        {pokemonDetail.pokemon_stats[0].base_stats.map((stat, index) => (
          <VStack key={`${stat.stat_name.name} ${index}`} w="100%">
            <Text>{stat.stat_name.name}</Text>
            <Progress
              colorScheme="purple"
              borderRadius={'lg'}
              value={stat.base_stat}
              max={200}
              width="100%"
            />
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}

export { PokemonDetailViewer };
