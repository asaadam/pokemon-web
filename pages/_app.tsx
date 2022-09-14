import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pokemon_v2_pokemonspecies: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });
  const theme = extendTheme({
    colors: {
      pokemongreen: 'lightgreen',
      pokemonblue: 'mediumturquoise',
      pokemonbrown: 'navajowhite',
      pokemongray: 'lightslategray',
      pokemonpurple: 'mediumpurple',
      pokemonred: 'tomato',
      pokemonwhite: 'seashell',
      pokemonyellow: 'lightyellow',
      pokemonblack: 'slategray',
      pokemonpink: 'pink',
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
