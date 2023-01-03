/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "fragment BaseStory on Story {\n  _id\n  image_url\n  filename\n  likes {\n    _id\n  }\n  user {\n    _id\n    avatar\n  }\n  likeStatus\n  watched\n  createdAt\n}": types.BaseStoryFragmentDoc,
    "fragment BaseUser on User {\n  _id\n  email\n  username\n  avatar\n  bio\n}": types.BaseUserFragmentDoc,
    "mutation LikeStory($storyId: String!) {\n  likeStory(storyId: $storyId)\n}": types.LikeStoryDocument,
    "mutation Login($input: UserInput!) {\n  login(input: $input) {\n    ...BaseUser\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation RemoveLike($storyId: String!) {\n  removeLike(storyId: $storyId)\n}": types.RemoveLikeDocument,
    "mutation RemoveStory($storyId: String!) {\n  removeStory(storyId: $storyId)\n}": types.RemoveStoryDocument,
    "mutation ReportStory($storyId: String!) {\n  reportStory(storyId: $storyId) {\n    _id\n    reportedStoryId\n    from\n    reportType\n    createdAt\n  }\n}": types.ReportStoryDocument,
    "mutation ReportUser($userId: String!) {\n  reportUser(userId: $userId) {\n    _id\n    reportedUserId\n    from\n    reportType\n    createdAt\n  }\n}": types.ReportUserDocument,
    "mutation UpdateUser($bio: String!) {\n  updateUser(bio: $bio) {\n    ...BaseUser\n  }\n}": types.UpdateUserDocument,
    "mutation Watched($storyId: String!) {\n  watched(storyId: $storyId)\n}": types.WatchedDocument,
    "query Me {\n  me {\n    ...BaseUser\n  }\n}": types.MeDocument,
    "query SearchUser($query: String!) {\n  searchUser(query: $query) {\n    _id\n    username\n    avatar\n  }\n}": types.SearchUserDocument,
    "query Stories {\n  stories {\n    ...BaseStory\n    isWatched\n  }\n}": types.StoriesDocument,
    "query Story($storyId: String!) {\n  story(storyId: $storyId) {\n    _id\n    image_url\n    filename\n    likes {\n      _id\n    }\n    user {\n      _id\n      avatar\n      username\n    }\n    likeStatus\n    watched\n    createdAt\n  }\n}": types.StoryDocument,
    "query User($id: String!) {\n  user(id: $id) {\n    ...BaseUser\n  }\n}": types.UserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment BaseStory on Story {\n  _id\n  image_url\n  filename\n  likes {\n    _id\n  }\n  user {\n    _id\n    avatar\n  }\n  likeStatus\n  watched\n  createdAt\n}"): (typeof documents)["fragment BaseStory on Story {\n  _id\n  image_url\n  filename\n  likes {\n    _id\n  }\n  user {\n    _id\n    avatar\n  }\n  likeStatus\n  watched\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment BaseUser on User {\n  _id\n  email\n  username\n  avatar\n  bio\n}"): (typeof documents)["fragment BaseUser on User {\n  _id\n  email\n  username\n  avatar\n  bio\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LikeStory($storyId: String!) {\n  likeStory(storyId: $storyId)\n}"): (typeof documents)["mutation LikeStory($storyId: String!) {\n  likeStory(storyId: $storyId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($input: UserInput!) {\n  login(input: $input) {\n    ...BaseUser\n  }\n}"): (typeof documents)["mutation Login($input: UserInput!) {\n  login(input: $input) {\n    ...BaseUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveLike($storyId: String!) {\n  removeLike(storyId: $storyId)\n}"): (typeof documents)["mutation RemoveLike($storyId: String!) {\n  removeLike(storyId: $storyId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveStory($storyId: String!) {\n  removeStory(storyId: $storyId)\n}"): (typeof documents)["mutation RemoveStory($storyId: String!) {\n  removeStory(storyId: $storyId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReportStory($storyId: String!) {\n  reportStory(storyId: $storyId) {\n    _id\n    reportedStoryId\n    from\n    reportType\n    createdAt\n  }\n}"): (typeof documents)["mutation ReportStory($storyId: String!) {\n  reportStory(storyId: $storyId) {\n    _id\n    reportedStoryId\n    from\n    reportType\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReportUser($userId: String!) {\n  reportUser(userId: $userId) {\n    _id\n    reportedUserId\n    from\n    reportType\n    createdAt\n  }\n}"): (typeof documents)["mutation ReportUser($userId: String!) {\n  reportUser(userId: $userId) {\n    _id\n    reportedUserId\n    from\n    reportType\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUser($bio: String!) {\n  updateUser(bio: $bio) {\n    ...BaseUser\n  }\n}"): (typeof documents)["mutation UpdateUser($bio: String!) {\n  updateUser(bio: $bio) {\n    ...BaseUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Watched($storyId: String!) {\n  watched(storyId: $storyId)\n}"): (typeof documents)["mutation Watched($storyId: String!) {\n  watched(storyId: $storyId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...BaseUser\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...BaseUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchUser($query: String!) {\n  searchUser(query: $query) {\n    _id\n    username\n    avatar\n  }\n}"): (typeof documents)["query SearchUser($query: String!) {\n  searchUser(query: $query) {\n    _id\n    username\n    avatar\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Stories {\n  stories {\n    ...BaseStory\n    isWatched\n  }\n}"): (typeof documents)["query Stories {\n  stories {\n    ...BaseStory\n    isWatched\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Story($storyId: String!) {\n  story(storyId: $storyId) {\n    _id\n    image_url\n    filename\n    likes {\n      _id\n    }\n    user {\n      _id\n      avatar\n      username\n    }\n    likeStatus\n    watched\n    createdAt\n  }\n}"): (typeof documents)["query Story($storyId: String!) {\n  story(storyId: $storyId) {\n    _id\n    image_url\n    filename\n    likes {\n      _id\n    }\n    user {\n      _id\n      avatar\n      username\n    }\n    likeStatus\n    watched\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query User($id: String!) {\n  user(id: $id) {\n    ...BaseUser\n  }\n}"): (typeof documents)["query User($id: String!) {\n  user(id: $id) {\n    ...BaseUser\n  }\n}"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;