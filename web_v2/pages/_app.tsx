import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
