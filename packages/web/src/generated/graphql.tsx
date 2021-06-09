import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type Like = {
  __typename?: 'Like';
  _id: Scalars['String'];
  storyId: Scalars['String'];
  userId: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: User;
  watched: Scalars['Boolean'];
  removeLike: Scalars['Boolean'];
  likeStory: Scalars['Boolean'];
  addStory?: Maybe<Story>;
};


export type MutationLoginArgs = {
  input: UserInput;
};


export type MutationWatchedArgs = {
  storyId: Scalars['String'];
};


export type MutationRemoveLikeArgs = {
  storyId: Scalars['String'];
};


export type MutationLikeStoryArgs = {
  storyId: Scalars['String'];
};


export type MutationAddStoryArgs = {
  input: StoryInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  info: Scalars['String'];
  user?: Maybe<User>;
  stories: Array<User>;
  me?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Story = {
  __typename?: 'Story';
  _id: Scalars['String'];
  image_url: Scalars['String'];
  filename: Scalars['String'];
  likes: Array<Like>;
  likeStatus?: Maybe<Scalars['Boolean']>;
  watched: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deleteAt: Scalars['DateTime'];
};

export type StoryInput = {
  filename: Scalars['String'];
  image_url: Scalars['String'];
  etag: Scalars['String'];
  publicId: Scalars['String'];
  assetId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  stories: Array<Story>;
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  googleId: Scalars['String'];
  avatar: Scalars['String'];
};

export type BaseStoryFragment = (
  { __typename?: 'Story' }
  & Pick<Story, '_id' | 'image_url' | 'filename' | 'createdAt' | 'deleteAt'>
);

export type BaseUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'email' | 'username' | 'avatar' | 'bio'>
);

export type AddStoryMutationVariables = Exact<{
  input: StoryInput;
}>;


export type AddStoryMutation = (
  { __typename?: 'Mutation' }
  & { addStory?: Maybe<(
    { __typename?: 'Story' }
    & Pick<Story, '_id' | 'image_url' | 'createdAt' | 'filename' | 'deleteAt'>
  )> }
);

export type LikeStoryMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type LikeStoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likeStory'>
);

export type LoginMutationVariables = Exact<{
  input: UserInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'avatar' | 'bio' | 'username'>
  ) }
);

export type RemoveLikeMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type RemoveLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeLike'>
);

export type WatchedMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type WatchedMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'watched'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export type StoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type StoriesQuery = (
  { __typename?: 'Query' }
  & { stories: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'username' | 'avatar'>
    & { stories: Array<(
      { __typename?: 'Story' }
      & BaseStoryFragment
    )> }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'avatar' | 'username' | 'bio'>
    & { stories: Array<(
      { __typename?: 'Story' }
      & Pick<Story, 'watched' | 'likeStatus'>
      & { likes: Array<(
        { __typename?: 'Like' }
        & Pick<Like, '_id'>
      )> }
      & BaseStoryFragment
    )> }
  )> }
);

export const BaseStoryFragmentDoc = gql`
    fragment BaseStory on Story {
  _id
  image_url
  filename
  createdAt
  deleteAt
}
    `;
export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  _id
  email
  username
  avatar
  bio
}
    `;
export const AddStoryDocument = gql`
    mutation AddStory($input: StoryInput!) {
  addStory(input: $input) {
    _id
    image_url
    createdAt
    filename
    deleteAt
  }
}
    `;
export type AddStoryMutationFn = Apollo.MutationFunction<AddStoryMutation, AddStoryMutationVariables>;

/**
 * __useAddStoryMutation__
 *
 * To run a mutation, you first call `useAddStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStoryMutation, { data, loading, error }] = useAddStoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddStoryMutation(baseOptions?: Apollo.MutationHookOptions<AddStoryMutation, AddStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStoryMutation, AddStoryMutationVariables>(AddStoryDocument, options);
      }
export type AddStoryMutationHookResult = ReturnType<typeof useAddStoryMutation>;
export type AddStoryMutationResult = Apollo.MutationResult<AddStoryMutation>;
export type AddStoryMutationOptions = Apollo.BaseMutationOptions<AddStoryMutation, AddStoryMutationVariables>;
export const LikeStoryDocument = gql`
    mutation LikeStory($storyId: String!) {
  likeStory(storyId: $storyId)
}
    `;
export type LikeStoryMutationFn = Apollo.MutationFunction<LikeStoryMutation, LikeStoryMutationVariables>;

/**
 * __useLikeStoryMutation__
 *
 * To run a mutation, you first call `useLikeStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeStoryMutation, { data, loading, error }] = useLikeStoryMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useLikeStoryMutation(baseOptions?: Apollo.MutationHookOptions<LikeStoryMutation, LikeStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeStoryMutation, LikeStoryMutationVariables>(LikeStoryDocument, options);
      }
export type LikeStoryMutationHookResult = ReturnType<typeof useLikeStoryMutation>;
export type LikeStoryMutationResult = Apollo.MutationResult<LikeStoryMutation>;
export type LikeStoryMutationOptions = Apollo.BaseMutationOptions<LikeStoryMutation, LikeStoryMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: UserInput!) {
  login(input: $input) {
    _id
    email
    avatar
    bio
    username
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RemoveLikeDocument = gql`
    mutation RemoveLike($storyId: String!) {
  removeLike(storyId: $storyId)
}
    `;
export type RemoveLikeMutationFn = Apollo.MutationFunction<RemoveLikeMutation, RemoveLikeMutationVariables>;

/**
 * __useRemoveLikeMutation__
 *
 * To run a mutation, you first call `useRemoveLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikeMutation, { data, loading, error }] = useRemoveLikeMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useRemoveLikeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLikeMutation, RemoveLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(RemoveLikeDocument, options);
      }
export type RemoveLikeMutationHookResult = ReturnType<typeof useRemoveLikeMutation>;
export type RemoveLikeMutationResult = Apollo.MutationResult<RemoveLikeMutation>;
export type RemoveLikeMutationOptions = Apollo.BaseMutationOptions<RemoveLikeMutation, RemoveLikeMutationVariables>;
export const WatchedDocument = gql`
    mutation Watched($storyId: String!) {
  watched(storyId: $storyId)
}
    `;
export type WatchedMutationFn = Apollo.MutationFunction<WatchedMutation, WatchedMutationVariables>;

/**
 * __useWatchedMutation__
 *
 * To run a mutation, you first call `useWatchedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWatchedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [watchedMutation, { data, loading, error }] = useWatchedMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useWatchedMutation(baseOptions?: Apollo.MutationHookOptions<WatchedMutation, WatchedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WatchedMutation, WatchedMutationVariables>(WatchedDocument, options);
      }
export type WatchedMutationHookResult = ReturnType<typeof useWatchedMutation>;
export type WatchedMutationResult = Apollo.MutationResult<WatchedMutation>;
export type WatchedMutationOptions = Apollo.BaseMutationOptions<WatchedMutation, WatchedMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const StoriesDocument = gql`
    query Stories {
  stories {
    _id
    email
    username
    avatar
    stories {
      ...BaseStory
    }
  }
}
    ${BaseStoryFragmentDoc}`;

/**
 * __useStoriesQuery__
 *
 * To run a query within a React component, call `useStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useStoriesQuery(baseOptions?: Apollo.QueryHookOptions<StoriesQuery, StoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoriesQuery, StoriesQueryVariables>(StoriesDocument, options);
      }
export function useStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoriesQuery, StoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoriesQuery, StoriesQueryVariables>(StoriesDocument, options);
        }
export type StoriesQueryHookResult = ReturnType<typeof useStoriesQuery>;
export type StoriesLazyQueryHookResult = ReturnType<typeof useStoriesLazyQuery>;
export type StoriesQueryResult = Apollo.QueryResult<StoriesQuery, StoriesQueryVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    _id
    avatar
    username
    bio
    stories {
      ...BaseStory
      watched
      likeStatus
      likes {
        _id
      }
    }
  }
}
    ${BaseStoryFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;