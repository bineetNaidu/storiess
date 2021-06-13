import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  ChakraProvider,
  ColorModeScript,
  ColorModeProvider,
} from '@chakra-ui/react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import theme from './lib/theme';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL!,
  cache: new InMemoryCache(),
  credentials: 'include',
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ChakraProvider resetCSS>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ColorModeProvider options={{ initialColorMode: 'dark' }}>
            <App />
          </ColorModeProvider>
        </ChakraProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
