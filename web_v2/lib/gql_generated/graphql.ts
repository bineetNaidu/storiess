/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  createdAt: Scalars['DateTime'];
  storyId: Scalars['String'];
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  likeStory: Scalars['Boolean'];
  login: User;
  logout: Scalars['Boolean'];
  removeLike: Scalars['Boolean'];
  removeStory: Scalars['Boolean'];
  reportStory?: Maybe<Report>;
  reportUser?: Maybe<Report>;
  updateUser: User;
  watched: Scalars['Boolean'];
};


export type MutationLikeStoryArgs = {
  storyId: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UserInput;
};


export type MutationRemoveLikeArgs = {
  storyId: Scalars['String'];
};


export type MutationRemoveStoryArgs = {
  storyId: Scalars['String'];
};


export type MutationReportStoryArgs = {
  storyId: Scalars['String'];
};


export type MutationReportUserArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  bio: Scalars['String'];
};


export type MutationWatchedArgs = {
  storyId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  info: Scalars['String'];
  me?: Maybe<User>;
  report?: Maybe<Report>;
  reports: Array<Report>;
  searchUser: Array<User>;
  stories: Array<Story>;
  story?: Maybe<Story>;
  user?: Maybe<User>;
};


export type QueryReportArgs = {
  id: Scalars['String'];
};


export type QuerySearchUserArgs = {
  query: Scalars['String'];
};


export type QueryStoryArgs = {
  storyId: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  from: Scalars['String'];
  reportType: Scalars['String'];
  reportedStoryId?: Maybe<Scalars['String']>;
  reportedUserId?: Maybe<Scalars['String']>;
};

export type Story = {
  __typename?: 'Story';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  filename: Scalars['String'];
  image_url: Scalars['String'];
  isWatched?: Maybe<Scalars['Boolean']>;
  likeStatus?: Maybe<Scalars['Boolean']>;
  likes: Array<Like>;
  user: User;
  watched: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  avatar: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  avatar: Scalars['String'];
  email: Scalars['String'];
  googleId: Scalars['String'];
  username: Scalars['String'];
};

export type BaseStoryFragment = { __typename?: 'Story', _id: string, image_url: string, filename: string, likeStatus?: boolean | null, watched: Array<string>, createdAt: any, likes: Array<{ __typename?: 'Like', _id: string }>, user: { __typename?: 'User', _id: string, avatar: string } };

export type BaseUserFragment = { __typename?: 'User', _id: string, email: string, username: string, avatar: string, bio?: string | null };

export type LikeStoryMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type LikeStoryMutation = { __typename?: 'Mutation', likeStory: boolean };

export type LoginMutationVariables = Exact<{
  input: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', _id: string, email: string, username: string, avatar: string, bio?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RemoveLikeMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type RemoveLikeMutation = { __typename?: 'Mutation', removeLike: boolean };

export type RemoveStoryMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type RemoveStoryMutation = { __typename?: 'Mutation', removeStory: boolean };

export type ReportStoryMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type ReportStoryMutation = { __typename?: 'Mutation', reportStory?: { __typename?: 'Report', _id: string, reportedStoryId?: string | null, from: string, reportType: string, createdAt: any } | null };

export type ReportUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ReportUserMutation = { __typename?: 'Mutation', reportUser?: { __typename?: 'Report', _id: string, reportedUserId?: string | null, from: string, reportType: string, createdAt: any } | null };

export type UpdateUserMutationVariables = Exact<{
  bio: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string, email: string, username: string, avatar: string, bio?: string | null } };

export type WatchedMutationVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type WatchedMutation = { __typename?: 'Mutation', watched: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, email: string, username: string, avatar: string, bio?: string | null } | null };

export type SearchUserQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser: Array<{ __typename?: 'User', _id: string, username: string, avatar: string }> };

export type StoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type StoriesQuery = { __typename?: 'Query', stories: Array<{ __typename?: 'Story', isWatched?: boolean | null, _id: string, image_url: string, filename: string, likeStatus?: boolean | null, watched: Array<string>, createdAt: any, likes: Array<{ __typename?: 'Like', _id: string }>, user: { __typename?: 'User', _id: string, avatar: string } }> };

export type StoryQueryVariables = Exact<{
  storyId: Scalars['String'];
}>;


export type StoryQuery = { __typename?: 'Query', story?: { __typename?: 'Story', _id: string, image_url: string, filename: string, likeStatus?: boolean | null, watched: Array<string>, createdAt: any, likes: Array<{ __typename?: 'Like', _id: string }>, user: { __typename?: 'User', _id: string, avatar: string, username: string } } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, email: string, username: string, avatar: string, bio?: string | null } | null };

export const BaseStoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseStory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeStatus"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<BaseStoryFragment, unknown>;
export const BaseUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]} as unknown as DocumentNode<BaseUserFragment, unknown>;
export const LikeStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}}}]}]}}]} as unknown as DocumentNode<LikeStoryMutation, LikeStoryMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}}]}},...BaseUserFragmentDoc.definitions]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RemoveLikeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveLike"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeLike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}}}]}]}}]} as unknown as DocumentNode<RemoveLikeMutation, RemoveLikeMutationVariables>;
export const RemoveStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}}}]}]}}]} as unknown as DocumentNode<RemoveStoryMutation, RemoveStoryMutationVariables>;
export const ReportStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReportStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"reportedStoryId"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"reportType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ReportStoryMutation, ReportStoryMutationVariables>;
export const ReportUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReportUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"reportedUserId"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"reportType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ReportUserMutation, ReportUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}}]}},...BaseUserFragmentDoc.definitions]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const WatchedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Watched"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watched"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}}}]}]}}]} as unknown as DocumentNode<WatchedMutation, WatchedMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}}]}},...BaseUserFragmentDoc.definitions]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const SearchUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<SearchUserQuery, SearchUserQueryVariables>;
export const StoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Stories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseStory"}},{"kind":"Field","name":{"kind":"Name","value":"isWatched"}}]}}]}},...BaseStoryFragmentDoc.definitions]} as unknown as DocumentNode<StoriesQuery, StoriesQueryVariables>;
export const StoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Story"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"story"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likeStatus"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<StoryQuery, StoryQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}}]}},...BaseUserFragmentDoc.definitions]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;