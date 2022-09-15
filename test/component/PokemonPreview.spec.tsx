import { cleanup, render, screen } from '@testing-library/react';
import { PokemonPreview } from '../../component/PokemonPreview';

afterEach(cleanup);

const pokemonData = {
  id: 8,
  name: 'wartortle',
  is_mythical: false,
  is_legendary: false,
  pokemons_detail: [
    {
      pokemon_type: [
        {
          type: {
            name: 'water',
          },
        },
      ],
    },
  ],
  color: {
    name: 'blue',
  },
};

describe('Test pokemonpreview', () => {
  test('should show pokemon name', () => {
    render(<PokemonPreview pokemon={pokemonData} />);
    const pokemonName = screen.getByRole('heading', {
      name: /wartortle/i,
    });
    expect(pokemonName).toBeInTheDocument();
  });
  test('should show valid background', () => {
    render(<PokemonPreview pokemon={pokemonData} />);
    const pokemonBackground = screen.getByTestId('pokemonBackground');
    expect(pokemonBackground).toHaveStyle(`background-color:'mediumturquoise'`);
  });
  test('should show types', () => {
    render(<PokemonPreview pokemon={pokemonData} />);
    const pokemonType = screen.getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('water');
  });
});
