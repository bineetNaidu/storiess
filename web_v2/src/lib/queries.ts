import { graphql } from './gql_generated';

export const loginMutationQuery = graphql(`
  mutation Login($input: UserInput!) {
    login(input: $input) {
      ...BaseUser
    }
  }
`);

export const storiesQuery = graphql(`
  query Stories {
    stories {
      ...BaseStory
      isWatched
    }
  }
`);

export const meQuery = graphql(`
  query Me {
    me {
      ...BaseUser
    }
  }
`);
