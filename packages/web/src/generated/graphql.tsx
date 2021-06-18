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
  logout: Scalars['Boolean'];
  updateUser: User;
  login: User;
  removeStory: Scalars['Boolean'];
  watched: Scalars['Boolean'];
  removeLike: Scalars['Boolean'];
  likeStory: Scalars['Boolean'];
  reportStory?: Maybe<Report>;
  reportUser?: Maybe<Report>;
};


export type MutationUpdateUserArgs = {
  bio: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UserInput;
};


export type MutationRemoveStoryArgs = {
  storyId: Scalars['String'];
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


export type MutationReportStoryArgs = {
  storyId: Scalars['String'];
};


export type MutationReportUserArgs = {
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  info: Scalars['String'];
  searchUser: Array<User>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  story?: Maybe<Story>;
  stories: Array<Story>;
  reports: Array<Report>;
  report?: Maybe<Report>;
};


export type QuerySearchUserArgs = {
  query: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryStoryArgs = {
  storyId: Scalars['String'];
};


export type QueryReportArgs = {
  id: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  _id: Scalars['String'];
  reportedStoryId?: Maybe<Scalars['String']>;
  reportedUserId?: Maybe<Scalars['String']>;
  from: Scalars['String'];
  reportType: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type Story = {
  __typename?: 'Story';
  _id: Scalars['String'];
  image_url: Scalars['String'];
  filename: Scalars['String'];
  likes: Array<Like>;
  user: User;
  likeStatus?: Maybe<Scalars['Boolean']>;
  watched: Array<Scalars['String']>;
  isWatched?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  googleId: Scalars['String'];
  avatar: Scalars['String'];
};

export type BaseStoryFragment = (
  { __typename?: 'Story' }
  & Pick<Story, '_id' | 'image_url' | 'filename' | 'likeStatus' | 'watched' | 'createdAt'>
  & { likes: Array<(
    { __typename?: 'Like' }
    & Pick<Like, '_id'>
  )>, user: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'avatar'>
  ) }
);

export type BaseUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'email' | 'username' | 'avatar' | 'bio'>
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
    & BaseUserFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RemoveLikeMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type RemoveLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeLike'>
);

export type RemoveStoryMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type RemoveStoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeStory'>
);

export type ReportStoryMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type ReportStoryMutation = (
  { __typename?: 'Mutation' }
  & { reportStory?: Maybe<(
    { __typename?: 'Report' }
    & Pick<Report, '_id' | 'reportedStoryId' | 'from' | 'reportType' | 'createdAt'>
  )> }
);

export type ReportUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ReportUserMutation = (
  { __typename?: 'Mutation' }
  & { reportUser?: Maybe<(
    { __typename?: 'Report' }
    & Pick<Report, '_id' | 'reportedUserId' | 'from' | 'reportType' | 'createdAt'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  bio: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & BaseUserFragment
  ) }
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

export type SearchUserQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchUserQuery = (
  { __typename?: 'Query' }
  & { searchUser: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'avatar'>
  )> }
);

export type StoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type StoriesQuery = (
  { __typename?: 'Query' }
  & { stories: Array<(
    { __typename?: 'Story' }
    & Pick<Story, 'isWatched'>
    & BaseStoryFragment
  )> }
);

export type StoryQueryVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type StoryQuery = (
  { __typename?: 'Query' }
  & { story?: Maybe<(
    { __typename?: 'Story' }
    & Pick<Story, '_id' | 'image_url' | 'filename' | 'likeStatus' | 'watched' | 'createdAt'>
    & { likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, '_id'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'avatar' | 'username'>
    ) }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export const BaseStoryFragmentDoc = gql`
    fragment BaseStory on Story {
  _id
  image_url
  filename
  likes {
    _id
  }
  user {
    _id
    avatar
  }
  likeStatus
  watched
  createdAt
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
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export const RemoveStoryDocument = gql`
    mutation RemoveStory($storyId: String!) {
  removeStory(storyId: $storyId)
}
    `;
export type RemoveStoryMutationFn = Apollo.MutationFunction<RemoveStoryMutation, RemoveStoryMutationVariables>;

/**
 * __useRemoveStoryMutation__
 *
 * To run a mutation, you first call `useRemoveStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStoryMutation, { data, loading, error }] = useRemoveStoryMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useRemoveStoryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStoryMutation, RemoveStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStoryMutation, RemoveStoryMutationVariables>(RemoveStoryDocument, options);
      }
export type RemoveStoryMutationHookResult = ReturnType<typeof useRemoveStoryMutation>;
export type RemoveStoryMutationResult = Apollo.MutationResult<RemoveStoryMutation>;
export type RemoveStoryMutationOptions = Apollo.BaseMutationOptions<RemoveStoryMutation, RemoveStoryMutationVariables>;
export const ReportStoryDocument = gql`
    mutation ReportStory($storyId: String!) {
  reportStory(storyId: $storyId) {
    _id
    reportedStoryId
    from
    reportType
    createdAt
  }
}
    `;
export type ReportStoryMutationFn = Apollo.MutationFunction<ReportStoryMutation, ReportStoryMutationVariables>;

/**
 * __useReportStoryMutation__
 *
 * To run a mutation, you first call `useReportStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportStoryMutation, { data, loading, error }] = useReportStoryMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useReportStoryMutation(baseOptions?: Apollo.MutationHookOptions<ReportStoryMutation, ReportStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportStoryMutation, ReportStoryMutationVariables>(ReportStoryDocument, options);
      }
export type ReportStoryMutationHookResult = ReturnType<typeof useReportStoryMutation>;
export type ReportStoryMutationResult = Apollo.MutationResult<ReportStoryMutation>;
export type ReportStoryMutationOptions = Apollo.BaseMutationOptions<ReportStoryMutation, ReportStoryMutationVariables>;
export const ReportUserDocument = gql`
    mutation ReportUser($userId: String!) {
  reportUser(userId: $userId) {
    _id
    reportedUserId
    from
    reportType
    createdAt
  }
}
    `;
export type ReportUserMutationFn = Apollo.MutationFunction<ReportUserMutation, ReportUserMutationVariables>;

/**
 * __useReportUserMutation__
 *
 * To run a mutation, you first call `useReportUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportUserMutation, { data, loading, error }] = useReportUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useReportUserMutation(baseOptions?: Apollo.MutationHookOptions<ReportUserMutation, ReportUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportUserMutation, ReportUserMutationVariables>(ReportUserDocument, options);
      }
export type ReportUserMutationHookResult = ReturnType<typeof useReportUserMutation>;
export type ReportUserMutationResult = Apollo.MutationResult<ReportUserMutation>;
export type ReportUserMutationOptions = Apollo.BaseMutationOptions<ReportUserMutation, ReportUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($bio: String!) {
  updateUser(bio: $bio) {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
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
export const SearchUserDocument = gql`
    query SearchUser($query: String!) {
  searchUser(query: $query) {
    _id
    username
    avatar
  }
}
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions: Apollo.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
      }
export function useSearchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const StoriesDocument = gql`
    query Stories {
  stories {
    ...BaseStory
    isWatched
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
export const StoryDocument = gql`
    query Story($storyId: String!) {
  story(storyId: $storyId) {
    _id
    image_url
    filename
    likes {
      _id
    }
    user {
      _id
      avatar
      username
    }
    likeStatus
    watched
    createdAt
  }
}
    `;

/**
 * __useStoryQuery__
 *
 * To run a query within a React component, call `useStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoryQuery({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useStoryQuery(baseOptions: Apollo.QueryHookOptions<StoryQuery, StoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoryQuery, StoryQueryVariables>(StoryDocument, options);
      }
export function useStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoryQuery, StoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoryQuery, StoryQueryVariables>(StoryDocument, options);
        }
export type StoryQueryHookResult = ReturnType<typeof useStoryQuery>;
export type StoryLazyQueryHookResult = ReturnType<typeof useStoryLazyQuery>;
export type StoryQueryResult = Apollo.QueryResult<StoryQuery, StoryQueryVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

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