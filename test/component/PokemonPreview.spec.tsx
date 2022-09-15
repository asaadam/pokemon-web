import { cleanup, render, screen } from '@testing-library/react';
import { PokemonPreview } from '../../component/PokemonPreview';

afterEach(cleanup);

describe('Test pokemonpreview', () => {
  test('should show pokemon name', () => {
    render(
      <PokemonPreview
        pokemon={{
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
        }}
      />
    );
    const pokemonName = screen.getByRole('heading', {
      name: /wartortle/i,
    });
    expect(pokemonName).toBeInTheDocument();
  });
  test('should show valid background', () => {
    render(
      <PokemonPreview
        pokemon={{
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
        }}
      />
    );
    const pokemonBackground = screen.getByTestId('pokemonBackground');
    expect(pokemonBackground).toHaveStyle(`background-color:'mediumturquoise'`);
  });
  test('should show types', () => {
    render(
      <PokemonPreview
        pokemon={{
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
        }}
      />
    );
    const pokemonType = screen.getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('water');
  });
});
