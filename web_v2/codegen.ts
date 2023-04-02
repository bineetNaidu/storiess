import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: ['./src/graphql/**/*.gql', './src/lib/queries.ts'],
  generates: {
    './src/lib/gql_generated/': {
      preset: 'client-preset',
      plugins: [],
    },
  },
};

export default config;
