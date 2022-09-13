import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache({}),
  });

  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
