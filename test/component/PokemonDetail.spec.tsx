import { cleanup, render, screen } from '@testing-library/react';
import { PokemonDetailViewer } from '../../component/PokemonDetail';
import { PokemonPreview } from '../../component/PokemonPreview';

afterEach(cleanup);

const pokemonData = {
  id: 2,
  name: 'ivysaur',
  description: [
    {
      text: 'When the bulb on\nits back grows\nlarge, it appears\fto lose the\nability to stand\non its hind legs.',
    },
  ],
  is_mythical: false,
  is_legendary: false,
  base_happiness: 50,
  pokemon_stats: [
    {
      height: 10,
      weight: 130,
      base_stats: [
        {
          base_stat: 60,
          stat_name: {
            name: 'hp',
          },
        },
        {
          base_stat: 62,
          stat_name: {
            name: 'attack',
          },
        },
        {
          base_stat: 63,
          stat_name: {
            name: 'defense',
          },
        },
        {
          base_stat: 80,
          stat_name: {
            name: 'special-attack',
          },
        },
        {
          base_stat: 80,
          stat_name: {
            name: 'special-defense',
          },
        },
        {
          base_stat: 60,
          stat_name: {
            name: 'speed',
          },
        },
      ],
    },
  ],
  pokemons_detail: [
    {
      pokemon_abilities: [
        {
          ability: {
            name: 'chlorophyll',
          },
        },
        {
          ability: {
            name: 'overgrow',
          },
        },
      ],
      pokemon_type: [
        {
          type: {
            name: 'grass',
          },
        },
        {
          type: {
            name: 'poison',
          },
        },
      ],
    },
  ],
  color: {
    name: 'green',
  },
};

describe('Test Pokemon Detail', () => {
  test('should show valid description', () => {
    render(<PokemonDetailViewer pokemonDetail={pokemonData} />);
    const pokemonDescription = screen.getByText(
      /when the bulb on its back grows large, it appears to lose the ability to stand on its hind legs\./i
    );
    expect(pokemonDescription).toBeInTheDocument();
  });
});
