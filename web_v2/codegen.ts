import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: [
    './graphql/**/*.gql',
    './components/**/*.tsx',
    './pages/**/*.tsx',
  ],
  generates: {
    './lib/gql_generated/': {
      preset: 'client-preset',
      plugins: [],
    },
  },
};

export default config;
