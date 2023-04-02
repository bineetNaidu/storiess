import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from '../lib/configuration';

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <QueryClientProvider client={client}>
        <GoogleOAuthProvider clientId={config.oauth.google.client_id}>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
