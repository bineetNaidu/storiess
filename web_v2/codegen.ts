import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: './graphql/**/*.gql',
  generates: {
    'lib/gql_generated': {
      preset: 'gql-tag-operations-preset',
      plugins: [],
    },
  },
};

export default config;
