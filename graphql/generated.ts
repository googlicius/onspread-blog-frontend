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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  /** Name of the category */
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<UploadFile>;
};

export type CategoryAggregator = {
  __typename?: 'CategoryAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  values?: Maybe<Array<Maybe<Category>>>;
  groupBy?: Maybe<CategoryGroupBy>;
  aggregate?: Maybe<CategoryAggregator>;
};

export type CategoryConnectionCreatedAt = {
  __typename?: 'CategoryConnectionCreatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionDescription = {
  __typename?: 'CategoryConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionId = {
  __typename?: 'CategoryConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionImage = {
  __typename?: 'CategoryConnectionImage';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionName = {
  __typename?: 'CategoryConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionUpdatedAt = {
  __typename?: 'CategoryConnectionUpdatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnection_Id = {
  __typename?: 'CategoryConnection_id';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryGroupBy = {
  __typename?: 'CategoryGroupBy';
  id?: Maybe<Array<Maybe<CategoryConnectionId>>>;
  _id?: Maybe<Array<Maybe<CategoryConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<CategoryConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<CategoryConnectionUpdatedAt>>>;
  name?: Maybe<Array<Maybe<CategoryConnectionName>>>;
  description?: Maybe<Array<Maybe<CategoryConnectionDescription>>>;
  image?: Maybe<Array<Maybe<CategoryConnectionImage>>>;
};

export type CategoryInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  content: Scalars['String'];
  user?: Maybe<UsersPermissionsUser>;
  post?: Maybe<Post>;
};

export type CommentAggregator = {
  __typename?: 'CommentAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  values?: Maybe<Array<Maybe<Comment>>>;
  groupBy?: Maybe<CommentGroupBy>;
  aggregate?: Maybe<CommentAggregator>;
};

export type CommentConnectionContent = {
  __typename?: 'CommentConnectionContent';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionCreatedAt = {
  __typename?: 'CommentConnectionCreatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionId = {
  __typename?: 'CommentConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionPost = {
  __typename?: 'CommentConnectionPost';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionUpdatedAt = {
  __typename?: 'CommentConnectionUpdatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionUser = {
  __typename?: 'CommentConnectionUser';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnection_Id = {
  __typename?: 'CommentConnection_id';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CommentConnection>;
};

export type CommentGroupBy = {
  __typename?: 'CommentGroupBy';
  id?: Maybe<Array<Maybe<CommentConnectionId>>>;
  _id?: Maybe<Array<Maybe<CommentConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<CommentConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<CommentConnectionUpdatedAt>>>;
  content?: Maybe<Array<Maybe<CommentConnectionContent>>>;
  user?: Maybe<Array<Maybe<CommentConnectionUser>>>;
  post?: Maybe<Array<Maybe<CommentConnectionPost>>>;
};

export type CommentInput = {
  content: Scalars['String'];
  user?: Maybe<Scalars['ID']>;
  post?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};



export enum Enum_Post_Contenttype {
  Markdown = 'Markdown',
  Html = 'Html'
}

export enum Enum_Post_Displaytype {
  WithImage = 'WithImage',
  FullscreenImage = 'FullscreenImage',
  NoImage = 'NoImage'
}

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type FileInput = {
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type InputId = {
  id: Scalars['ID'];
};


export type LocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};


export type Morph = UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | Category | CategoryConnection | CategoryAggregator | CategoryGroupBy | CategoryConnectionId | CategoryConnection_Id | CategoryConnectionCreatedAt | CategoryConnectionUpdatedAt | CategoryConnectionName | CategoryConnectionDescription | CategoryConnectionImage | CreateCategoryPayload | UpdateCategoryPayload | DeleteCategoryPayload | Comment | CommentConnection | CommentAggregator | CommentGroupBy | CommentConnectionId | CommentConnection_Id | CommentConnectionCreatedAt | CommentConnectionUpdatedAt | CommentConnectionContent | CommentConnectionUser | CommentConnectionPost | CreateCommentPayload | UpdateCommentPayload | DeleteCommentPayload | Post | PostConnection | PostAggregator | PostAggregatorSum | PostAggregatorAvg | PostAggregatorMin | PostAggregatorMax | PostGroupBy | PostConnectionId | PostConnection_Id | PostConnectionCreatedAt | PostConnectionUpdatedAt | PostConnectionTitle | PostConnectionContent | PostConnectionImage | PostConnectionCategory | PostConnectionUser | PostConnectionSlug | PostConnectionDescription | PostConnectionHeart | PostConnectionHomeFeatured | PostConnectionContentType | PostConnectionDisplayType | PostConnectionStory | PostConnectionStorySeq | PostConnectionPublished_At | CreatePostPayload | UpdatePostPayload | DeletePostPayload | Story | StoryConnection | StoryAggregator | StoryGroupBy | StoryConnectionId | StoryConnection_Id | StoryConnectionCreatedAt | StoryConnectionUpdatedAt | StoryConnectionName | StoryConnectionDescription | StoryConnectionImage | StoryConnectionUser | CreateStoryPayload | UpdateStoryPayload | DeleteStoryPayload | I18NLocale | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnection_Id | UploadFileConnectionCreatedAt | UploadFileConnectionUpdatedAt | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnection_Id | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnection_Id | UsersPermissionsUserConnectionCreatedAt | UsersPermissionsUserConnectionUpdatedAt | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionAvatar | CreateUserPayload | UpdateUserPayload | DeleteUserPayload;

export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<CreateCategoryPayload>;
  updateCategory?: Maybe<UpdateCategoryPayload>;
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  createComment?: Maybe<CreateCommentPayload>;
  updateComment?: Maybe<UpdateCommentPayload>;
  deleteComment?: Maybe<DeleteCommentPayload>;
  createPost?: Maybe<CreatePostPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  deletePost?: Maybe<DeletePostPayload>;
  createStory?: Maybe<CreateStoryPayload>;
  updateStory?: Maybe<UpdateStoryPayload>;
  deleteStory?: Maybe<DeleteStoryPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  updateFileInfo: UploadFile;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  logout?: Maybe<Scalars['String']>;
  /** Give heart from user to post */
  giveHeart: Scalars['Int'];
  /** Publish post */
  publishPost: Post;
  /** Unpublish post */
  unPublishPost: Post;
};


export type MutationCreateCategoryArgs = {
  input?: Maybe<CreateCategoryInput>;
};


export type MutationUpdateCategoryArgs = {
  input?: Maybe<UpdateCategoryInput>;
};


export type MutationDeleteCategoryArgs = {
  input?: Maybe<DeleteCategoryInput>;
};


export type MutationCreateCommentArgs = {
  input?: Maybe<CreateCommentInput>;
};


export type MutationUpdateCommentArgs = {
  input?: Maybe<UpdateCommentInput>;
};


export type MutationDeleteCommentArgs = {
  input?: Maybe<DeleteCommentInput>;
};


export type MutationCreatePostArgs = {
  input?: Maybe<CreatePostInput>;
};


export type MutationUpdatePostArgs = {
  input?: Maybe<UpdatePostInput>;
};


export type MutationDeletePostArgs = {
  input?: Maybe<DeletePostInput>;
};


export type MutationCreateStoryArgs = {
  input?: Maybe<CreateStoryInput>;
};


export type MutationUpdateStoryArgs = {
  input?: Maybe<UpdateStoryInput>;
};


export type MutationDeleteStoryArgs = {
  input?: Maybe<DeleteStoryInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  info?: Maybe<FileInfoInput>;
  file: Scalars['Upload'];
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationGiveHeartArgs = {
  postId: Scalars['ID'];
  heart: Scalars['Int'];
};


export type MutationPublishPostArgs = {
  id: Scalars['ID'];
};


export type MutationUnPublishPostArgs = {
  id: Scalars['ID'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  content: Scalars['String'];
  image?: Maybe<UploadFile>;
  category?: Maybe<Category>;
  user?: Maybe<UsersPermissionsUser>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  heart?: Maybe<Scalars['Int']>;
  homeFeatured?: Maybe<Scalars['Boolean']>;
  contentType?: Maybe<Enum_Post_Contenttype>;
  displayType?: Maybe<Enum_Post_Displaytype>;
  story?: Maybe<Story>;
  storySeq?: Maybe<Scalars['Float']>;
  published_at?: Maybe<Scalars['DateTime']>;
  /** Next post of series. */
  nextPost?: Maybe<Post>;
};

export type PostAggregator = {
  __typename?: 'PostAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<PostAggregatorSum>;
  avg?: Maybe<PostAggregatorAvg>;
  min?: Maybe<PostAggregatorMin>;
  max?: Maybe<PostAggregatorMax>;
};

export type PostAggregatorAvg = {
  __typename?: 'PostAggregatorAvg';
  heart?: Maybe<Scalars['Float']>;
  storySeq?: Maybe<Scalars['Float']>;
};

export type PostAggregatorMax = {
  __typename?: 'PostAggregatorMax';
  heart?: Maybe<Scalars['Float']>;
  storySeq?: Maybe<Scalars['Float']>;
};

export type PostAggregatorMin = {
  __typename?: 'PostAggregatorMin';
  heart?: Maybe<Scalars['Float']>;
  storySeq?: Maybe<Scalars['Float']>;
};

export type PostAggregatorSum = {
  __typename?: 'PostAggregatorSum';
  heart?: Maybe<Scalars['Float']>;
  storySeq?: Maybe<Scalars['Float']>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  values?: Maybe<Array<Maybe<Post>>>;
  groupBy?: Maybe<PostGroupBy>;
  aggregate?: Maybe<PostAggregator>;
};

export type PostConnectionCategory = {
  __typename?: 'PostConnectionCategory';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionContent = {
  __typename?: 'PostConnectionContent';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionContentType = {
  __typename?: 'PostConnectionContentType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionCreatedAt = {
  __typename?: 'PostConnectionCreatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionDescription = {
  __typename?: 'PostConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionDisplayType = {
  __typename?: 'PostConnectionDisplayType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionHeart = {
  __typename?: 'PostConnectionHeart';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionHomeFeatured = {
  __typename?: 'PostConnectionHomeFeatured';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionId = {
  __typename?: 'PostConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionImage = {
  __typename?: 'PostConnectionImage';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionPublished_At = {
  __typename?: 'PostConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionSlug = {
  __typename?: 'PostConnectionSlug';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionStory = {
  __typename?: 'PostConnectionStory';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionStorySeq = {
  __typename?: 'PostConnectionStorySeq';
  key?: Maybe<Scalars['Float']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionTitle = {
  __typename?: 'PostConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionUpdatedAt = {
  __typename?: 'PostConnectionUpdatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionUser = {
  __typename?: 'PostConnectionUser';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnection_Id = {
  __typename?: 'PostConnection_id';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostGroupBy = {
  __typename?: 'PostGroupBy';
  id?: Maybe<Array<Maybe<PostConnectionId>>>;
  _id?: Maybe<Array<Maybe<PostConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<PostConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<PostConnectionUpdatedAt>>>;
  title?: Maybe<Array<Maybe<PostConnectionTitle>>>;
  content?: Maybe<Array<Maybe<PostConnectionContent>>>;
  image?: Maybe<Array<Maybe<PostConnectionImage>>>;
  category?: Maybe<Array<Maybe<PostConnectionCategory>>>;
  user?: Maybe<Array<Maybe<PostConnectionUser>>>;
  slug?: Maybe<Array<Maybe<PostConnectionSlug>>>;
  description?: Maybe<Array<Maybe<PostConnectionDescription>>>;
  heart?: Maybe<Array<Maybe<PostConnectionHeart>>>;
  homeFeatured?: Maybe<Array<Maybe<PostConnectionHomeFeatured>>>;
  contentType?: Maybe<Array<Maybe<PostConnectionContentType>>>;
  displayType?: Maybe<Array<Maybe<PostConnectionDisplayType>>>;
  story?: Maybe<Array<Maybe<PostConnectionStory>>>;
  storySeq?: Maybe<Array<Maybe<PostConnectionStorySeq>>>;
  published_at?: Maybe<Array<Maybe<PostConnectionPublished_At>>>;
};

export type PostInput = {
  title: Scalars['String'];
  content: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  user?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  heart?: Maybe<Scalars['Int']>;
  homeFeatured?: Maybe<Scalars['Boolean']>;
  contentType?: Maybe<Enum_Post_Contenttype>;
  displayType?: Maybe<Enum_Post_Displaytype>;
  story?: Maybe<Scalars['ID']>;
  storySeq?: Maybe<Scalars['Float']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  category?: Maybe<Category>;
  categories?: Maybe<Array<Maybe<Category>>>;
  categoriesConnection?: Maybe<CategoryConnection>;
  comment?: Maybe<Comment>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  commentsConnection?: Maybe<CommentConnection>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  postsConnection?: Maybe<PostConnection>;
  story?: Maybe<Story>;
  stories?: Maybe<Array<Maybe<Story>>>;
  storiesConnection?: Maybe<StoryConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  me?: Maybe<UsersPermissionsMe>;
  /** Count comment of its post */
  countPostComment: Scalars['Int'];
  /** Get specific post by its slug */
  postBySlug?: Maybe<Post>;
  /** Get featured post */
  featuredPost?: Maybe<Post>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryCategoriesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCommentArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCommentsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryCommentsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryPostsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryPostsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryStoryArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryStoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryStoriesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCountPostCommentArgs = {
  postId: Scalars['ID'];
};


export type QueryPostBySlugArgs = {
  slug: Scalars['String'];
};

export type RoleInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Story = {
  __typename?: 'Story';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<UploadFile>;
  user?: Maybe<UsersPermissionsUser>;
};

export type StoryAggregator = {
  __typename?: 'StoryAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StoryConnection = {
  __typename?: 'StoryConnection';
  values?: Maybe<Array<Maybe<Story>>>;
  groupBy?: Maybe<StoryGroupBy>;
  aggregate?: Maybe<StoryAggregator>;
};

export type StoryConnectionCreatedAt = {
  __typename?: 'StoryConnectionCreatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<StoryConnection>;
};

export type StoryConnectionDescription = {
  __typename?: 'StoryConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<StoryConnection>;
};

export type StoryConnectionId = {
  __typename?: 'StoryConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoryConnection>;
};

export type StoryConnectionImage = {
  __typename?: 'StoryConnectionImage';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoryConnection>;
};

export type StoryConnectionName = {
  __typename?: 'StoryConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<StoryConnection>;
};

export type StoryConnectionUpdatedAt = {
  __typename?: 'StoryConnectionUpdatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<StoryConnection>;
};

export type StoryConnectionUser = {
  __typename?: 'StoryConnectionUser';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoryConnection>;
};

export type StoryConnection_Id = {
  __typename?: 'StoryConnection_id';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<StoryConnection>;
};

export type StoryGroupBy = {
  __typename?: 'StoryGroupBy';
  id?: Maybe<Array<Maybe<StoryConnectionId>>>;
  _id?: Maybe<Array<Maybe<StoryConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<StoryConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<StoryConnectionUpdatedAt>>>;
  name?: Maybe<Array<Maybe<StoryConnectionName>>>;
  description?: Maybe<Array<Maybe<StoryConnectionDescription>>>;
  image?: Maybe<Array<Maybe<StoryConnectionImage>>>;
  user?: Maybe<Array<Maybe<StoryConnectionUser>>>;
};

export type StoryInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  user?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};



export type UploadFile = {
  __typename?: 'UploadFile';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
};


export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<UploadFileAggregatorSum>;
  avg?: Maybe<UploadFileAggregatorAvg>;
  min?: Maybe<UploadFileAggregatorMin>;
  max?: Maybe<UploadFileAggregatorMax>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  values?: Maybe<Array<Maybe<UploadFile>>>;
  groupBy?: Maybe<UploadFileGroupBy>;
  aggregate?: Maybe<UploadFileAggregator>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCreatedAt = {
  __typename?: 'UploadFileConnectionCreatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  key?: Maybe<Scalars['Float']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUpdatedAt = {
  __typename?: 'UploadFileConnectionUpdatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnection_Id = {
  __typename?: 'UploadFileConnection_id';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  _id?: Maybe<Array<Maybe<UploadFileConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<UploadFileConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<UploadFileConnectionUpdatedAt>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  avatar?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsMeRole>;
  avatar?: Maybe<UploadFile>;
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
};


export type UsersPermissionsMeRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  type: Scalars['String'];
  controller: Scalars['String'];
  action: Scalars['String'];
  enabled: Scalars['Boolean'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnection_Id = {
  __typename?: 'UsersPermissionsRoleConnection_id';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  _id?: Maybe<Array<Maybe<UsersPermissionsRoleConnection_Id>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsRole>;
  avatar?: Maybe<UploadFile>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
};

export type UsersPermissionsUserConnectionAvatar = {
  __typename?: 'UsersPermissionsUserConnectionAvatar';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCreatedAt = {
  __typename?: 'UsersPermissionsUserConnectionCreatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUpdatedAt = {
  __typename?: 'UsersPermissionsUserConnectionUpdatedAt';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnection_Id = {
  __typename?: 'UsersPermissionsUserConnection_id';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  _id?: Maybe<Array<Maybe<UsersPermissionsUserConnection_Id>>>;
  createdAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdatedAt>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  avatar?: Maybe<Array<Maybe<UsersPermissionsUserConnectionAvatar>>>;
};

export type CreateCategoryInput = {
  data?: Maybe<CategoryInput>;
};

export type CreateCategoryPayload = {
  __typename?: 'createCategoryPayload';
  category?: Maybe<Category>;
};

export type CreateCommentInput = {
  data?: Maybe<CommentInput>;
};

export type CreateCommentPayload = {
  __typename?: 'createCommentPayload';
  comment?: Maybe<Comment>;
};

export type CreatePostInput = {
  data?: Maybe<PostInput>;
};

export type CreatePostPayload = {
  __typename?: 'createPostPayload';
  post?: Maybe<Post>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateStoryInput = {
  data?: Maybe<StoryInput>;
};

export type CreateStoryPayload = {
  __typename?: 'createStoryPayload';
  story?: Maybe<Story>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteCategoryInput = {
  where?: Maybe<InputId>;
};

export type DeleteCategoryPayload = {
  __typename?: 'deleteCategoryPayload';
  category?: Maybe<Category>;
};

export type DeleteCommentInput = {
  where?: Maybe<InputId>;
};

export type DeleteCommentPayload = {
  __typename?: 'deleteCommentPayload';
  comment?: Maybe<Comment>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeletePostInput = {
  where?: Maybe<InputId>;
};

export type DeletePostPayload = {
  __typename?: 'deletePostPayload';
  post?: Maybe<Post>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteStoryInput = {
  where?: Maybe<InputId>;
};

export type DeleteStoryPayload = {
  __typename?: 'deleteStoryPayload';
  story?: Maybe<Story>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type EditCategoryInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCommentInput = {
  content?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  post?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFileInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  ext?: Maybe<Scalars['String']>;
  mime?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditPostInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  user?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  heart?: Maybe<Scalars['Int']>;
  homeFeatured?: Maybe<Scalars['Boolean']>;
  contentType?: Maybe<Enum_Post_Contenttype>;
  displayType?: Maybe<Enum_Post_Displaytype>;
  story?: Maybe<Scalars['ID']>;
  storySeq?: Maybe<Scalars['Float']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditStoryInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  user?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  avatar?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateCategoryInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCategoryInput>;
};

export type UpdateCategoryPayload = {
  __typename?: 'updateCategoryPayload';
  category?: Maybe<Category>;
};

export type UpdateCommentInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCommentInput>;
};

export type UpdateCommentPayload = {
  __typename?: 'updateCommentPayload';
  comment?: Maybe<Comment>;
};

export type UpdatePostInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditPostInput>;
};

export type UpdatePostPayload = {
  __typename?: 'updatePostPayload';
  post?: Maybe<Post>;
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRoleInput>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateStoryInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditStoryInput>;
};

export type UpdateStoryPayload = {
  __typename?: 'updateStoryPayload';
  story?: Maybe<Story>;
};

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type LoginMutationVariables = Exact<{
  input: UsersPermissionsLoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UsersPermissionsLoginPayload' }
    & { user: (
      { __typename?: 'UsersPermissionsMe' }
      & Pick<UsersPermissionsMe, 'id' | 'username' | 'email'>
      & { avatar?: Maybe<(
        { __typename?: 'UploadFile' }
        & Pick<UploadFile, 'url' | 'formats' | 'alternativeText'>
      )> }
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CategoriesConnectionQueryVariables = Exact<{
  start?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
}>;


export type CategoriesConnectionQuery = (
  { __typename?: 'Query' }
  & { categoriesConnection?: Maybe<(
    { __typename?: 'CategoryConnection' }
    & { values?: Maybe<Array<Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )>>>, aggregate?: Maybe<(
      { __typename?: 'CategoryAggregator' }
      & Pick<CategoryAggregator, 'totalCount'>
    )> }
  )> }
);

export type CreateCategoryMutationVariables = Exact<{
  input?: Maybe<CreateCategoryInput>;
}>;


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory?: Maybe<(
    { __typename?: 'createCategoryPayload' }
    & { category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )> }
  )> }
);

export type CommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments?: Maybe<Array<Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'content' | 'createdAt'>
    & { user?: Maybe<(
      { __typename?: 'UsersPermissionsUser' }
      & Pick<UsersPermissionsUser, 'id' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'UploadFile' }
        & Pick<UploadFile, 'url' | 'formats' | 'alternativeText'>
      )> }
    )> }
  )>>> }
);

export type CreateCommentMutationVariables = Exact<{
  input?: Maybe<CreateCommentInput>;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'createCommentPayload' }
    & { comment?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'createdAt'>
      & { user?: Maybe<(
        { __typename?: 'UsersPermissionsUser' }
        & Pick<UsersPermissionsUser, 'id' | 'username'>
      )> }
    )> }
  )> }
);

export type CountPostCommentQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type CountPostCommentQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'countPostComment'>
);

export type CreatePostMutationVariables = Exact<{
  input?: Maybe<CreatePostInput>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'createPostPayload' }
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'slug' | 'title' | 'description' | 'content' | 'contentType' | 'displayType'>
      & { category?: Maybe<(
        { __typename?: 'Category' }
        & Pick<Category, 'id' | 'name'>
      )> }
    )> }
  )> }
);

export type FeaturedPostQueryVariables = Exact<{ [key: string]: never; }>;


export type FeaturedPostQuery = (
  { __typename?: 'Query' }
  & { featuredPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'title' | 'slug' | 'description'>
    & { image?: Maybe<(
      { __typename?: 'UploadFile' }
      & Pick<UploadFile, 'url'>
    )> }
  )> }
);

export type GiveHeartMutationVariables = Exact<{
  postId: Scalars['ID'];
  heart: Scalars['Int'];
}>;


export type GiveHeartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'giveHeart'>
);

export type PostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type PostBySlugQuery = (
  { __typename?: 'Query' }
  & { postBySlug?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'slug' | 'title' | 'description' | 'content' | 'contentType' | 'displayType' | 'heart' | 'published_at' | 'storySeq'>
    & { category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id'>
    )>, story?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'name'>
    )>, image?: Maybe<(
      { __typename?: 'UploadFile' }
      & Pick<UploadFile, 'id' | 'url' | 'provider' | 'formats'>
    )>, user?: Maybe<(
      { __typename?: 'UsersPermissionsUser' }
      & Pick<UsersPermissionsUser, 'id' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'UploadFile' }
        & Pick<UploadFile, 'url' | 'formats' | 'alternativeText'>
      )> }
    )>, nextPost?: Maybe<(
      { __typename?: 'Post' }
      & PostsConnectionFragmentFragment
    )> }
  )> }
);

export type PostsConnectionFragmentFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'slug' | 'description' | 'createdAt' | 'published_at'>
  & { user?: Maybe<(
    { __typename?: 'UsersPermissionsUser' }
    & Pick<UsersPermissionsUser, 'username'>
  )>, image?: Maybe<(
    { __typename?: 'UploadFile' }
    & Pick<UploadFile, 'url' | 'provider' | 'formats'>
  )> }
);

export type PostsByStoryQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  story: Scalars['ID'];
}>;


export type PostsByStoryQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'storySeq'>
  )>>> }
);

export type PostsConnectionQueryVariables = Exact<{
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
}>;


export type PostsConnectionQuery = (
  { __typename?: 'Query' }
  & { postsConnection?: Maybe<(
    { __typename?: 'PostConnection' }
    & { values?: Maybe<Array<Maybe<(
      { __typename?: 'Post' }
      & PostsConnectionFragmentFragment
    )>>>, aggregate?: Maybe<(
      { __typename?: 'PostAggregator' }
      & Pick<PostAggregator, 'count' | 'totalCount'>
    )> }
  )> }
);

export type PublishPostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PublishPostMutation = (
  { __typename?: 'Mutation' }
  & { publishPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'slug' | 'published_at'>
  ) }
);

export type UnPublishPostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnPublishPostMutation = (
  { __typename?: 'Mutation' }
  & { unPublishPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'slug' | 'published_at'>
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  input?: Maybe<UpdatePostInput>;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'updatePostPayload' }
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'slug' | 'title' | 'description' | 'content' | 'contentType' | 'displayType'>
      & { image?: Maybe<(
        { __typename?: 'UploadFile' }
        & Pick<UploadFile, 'id' | 'url' | 'provider' | 'formats'>
      )>, category?: Maybe<(
        { __typename?: 'Category' }
        & Pick<Category, 'id' | 'name'>
      )> }
    )> }
  )> }
);

export type CreateStoryMutationVariables = Exact<{
  input: CreateStoryInput;
}>;


export type CreateStoryMutation = (
  { __typename?: 'Mutation' }
  & { createStory?: Maybe<(
    { __typename?: 'createStoryPayload' }
    & { story?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'name' | 'description'>
    )> }
  )> }
);

export type StoriesConnectionQueryVariables = Exact<{
  start?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  user: Scalars['String'];
}>;


export type StoriesConnectionQuery = (
  { __typename?: 'Query' }
  & { storiesConnection?: Maybe<(
    { __typename?: 'StoryConnection' }
    & { values?: Maybe<Array<Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'name'>
    )>>>, aggregate?: Maybe<(
      { __typename?: 'StoryAggregator' }
      & Pick<StoryAggregator, 'totalCount'>
    )> }
  )> }
);

export type StoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryQuery = (
  { __typename?: 'Query' }
  & { story?: Maybe<(
    { __typename?: 'Story' }
    & Pick<Story, 'id' | 'name' | 'description'>
  )> }
);

export type FilesQueryVariables = Exact<{
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
}>;


export type FilesQuery = (
  { __typename?: 'Query' }
  & { files?: Maybe<Array<Maybe<(
    { __typename?: 'UploadFile' }
    & Pick<UploadFile, 'id' | 'url' | 'formats' | 'provider'>
  )>>> }
);

export type FilesConnectionQueryVariables = Exact<{
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
}>;


export type FilesConnectionQuery = (
  { __typename?: 'Query' }
  & { filesConnection?: Maybe<(
    { __typename?: 'UploadFileConnection' }
    & { values?: Maybe<Array<Maybe<(
      { __typename?: 'UploadFile' }
      & Pick<UploadFile, 'id' | 'name' | 'size' | 'ext' | 'mime' | 'width' | 'height' | 'formats' | 'url' | 'provider'>
    )>>>, aggregate?: Maybe<(
      { __typename?: 'UploadFileAggregator' }
      & Pick<UploadFileAggregator, 'count' | 'totalCount'>
    )> }
  )> }
);

export type MutipleUploadMutationVariables = Exact<{
  files: Array<Maybe<Scalars['Upload']>> | Maybe<Scalars['Upload']>;
}>;


export type MutipleUploadMutation = (
  { __typename?: 'Mutation' }
  & { multipleUpload: Array<Maybe<(
    { __typename?: 'UploadFile' }
    & Pick<UploadFile, 'id'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UsersPermissionsMe' }
    & Pick<UsersPermissionsMe, 'id' | 'username' | 'email'>
    & { avatar?: Maybe<(
      { __typename?: 'UploadFile' }
      & Pick<UploadFile, 'url' | 'formats' | 'alternativeText'>
    )> }
  )> }
);

export const PostsConnectionFragmentFragmentDoc = gql`
    fragment PostsConnectionFragment on Post {
  id
  title
  slug
  description
  createdAt
  published_at
  user {
    username
  }
  image {
    url
    provider
    formats
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($input: UsersPermissionsLoginInput!) {
  login(input: $input) {
    user {
      id
      username
      email
      avatar {
        url
        formats
        alternativeText
      }
    }
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
export const CategoriesConnectionDocument = gql`
    query CategoriesConnection($start: Int = 0, $search: String = "") {
  categoriesConnection(start: $start, where: {name_contains: $search}) {
    values {
      id
      name
    }
    aggregate {
      totalCount
    }
  }
}
    `;

/**
 * __useCategoriesConnectionQuery__
 *
 * To run a query within a React component, call `useCategoriesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesConnectionQuery({
 *   variables: {
 *      start: // value for 'start'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useCategoriesConnectionQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesConnectionQuery, CategoriesConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesConnectionQuery, CategoriesConnectionQueryVariables>(CategoriesConnectionDocument, options);
      }
export function useCategoriesConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesConnectionQuery, CategoriesConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesConnectionQuery, CategoriesConnectionQueryVariables>(CategoriesConnectionDocument, options);
        }
export type CategoriesConnectionQueryHookResult = ReturnType<typeof useCategoriesConnectionQuery>;
export type CategoriesConnectionLazyQueryHookResult = ReturnType<typeof useCategoriesConnectionLazyQuery>;
export type CategoriesConnectionQueryResult = Apollo.QueryResult<CategoriesConnectionQuery, CategoriesConnectionQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($input: createCategoryInput) {
  createCategory(input: $input) {
    category {
      id
      name
    }
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CommentsDocument = gql`
    query Comments($postId: ID!) {
  comments(where: {post: $postId}) {
    id
    content
    createdAt
    user {
      id
      username
      avatar {
        url
        formats
        alternativeText
      }
    }
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: createCommentInput) {
  createComment(input: $input) {
    comment {
      id
      content
      createdAt
      user {
        id
        username
      }
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CountPostCommentDocument = gql`
    query CountPostComment($postId: ID!) {
  countPostComment(postId: $postId)
}
    `;

/**
 * __useCountPostCommentQuery__
 *
 * To run a query within a React component, call `useCountPostCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountPostCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountPostCommentQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCountPostCommentQuery(baseOptions: Apollo.QueryHookOptions<CountPostCommentQuery, CountPostCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountPostCommentQuery, CountPostCommentQueryVariables>(CountPostCommentDocument, options);
      }
export function useCountPostCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountPostCommentQuery, CountPostCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountPostCommentQuery, CountPostCommentQueryVariables>(CountPostCommentDocument, options);
        }
export type CountPostCommentQueryHookResult = ReturnType<typeof useCountPostCommentQuery>;
export type CountPostCommentLazyQueryHookResult = ReturnType<typeof useCountPostCommentLazyQuery>;
export type CountPostCommentQueryResult = Apollo.QueryResult<CountPostCommentQuery, CountPostCommentQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: createPostInput) {
  createPost(input: $input) {
    post {
      id
      slug
      title
      description
      content
      contentType
      displayType
      category {
        id
        name
      }
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const FeaturedPostDocument = gql`
    query FeaturedPost {
  featuredPost {
    title
    slug
    description
    image {
      url
    }
  }
}
    `;

/**
 * __useFeaturedPostQuery__
 *
 * To run a query within a React component, call `useFeaturedPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeaturedPostQuery(baseOptions?: Apollo.QueryHookOptions<FeaturedPostQuery, FeaturedPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeaturedPostQuery, FeaturedPostQueryVariables>(FeaturedPostDocument, options);
      }
export function useFeaturedPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeaturedPostQuery, FeaturedPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeaturedPostQuery, FeaturedPostQueryVariables>(FeaturedPostDocument, options);
        }
export type FeaturedPostQueryHookResult = ReturnType<typeof useFeaturedPostQuery>;
export type FeaturedPostLazyQueryHookResult = ReturnType<typeof useFeaturedPostLazyQuery>;
export type FeaturedPostQueryResult = Apollo.QueryResult<FeaturedPostQuery, FeaturedPostQueryVariables>;
export const GiveHeartDocument = gql`
    mutation GiveHeart($postId: ID!, $heart: Int!) {
  giveHeart(postId: $postId, heart: $heart)
}
    `;
export type GiveHeartMutationFn = Apollo.MutationFunction<GiveHeartMutation, GiveHeartMutationVariables>;

/**
 * __useGiveHeartMutation__
 *
 * To run a mutation, you first call `useGiveHeartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGiveHeartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [giveHeartMutation, { data, loading, error }] = useGiveHeartMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      heart: // value for 'heart'
 *   },
 * });
 */
export function useGiveHeartMutation(baseOptions?: Apollo.MutationHookOptions<GiveHeartMutation, GiveHeartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GiveHeartMutation, GiveHeartMutationVariables>(GiveHeartDocument, options);
      }
export type GiveHeartMutationHookResult = ReturnType<typeof useGiveHeartMutation>;
export type GiveHeartMutationResult = Apollo.MutationResult<GiveHeartMutation>;
export type GiveHeartMutationOptions = Apollo.BaseMutationOptions<GiveHeartMutation, GiveHeartMutationVariables>;
export const PostBySlugDocument = gql`
    query PostBySlug($slug: String!) {
  postBySlug(slug: $slug) {
    id
    slug
    title
    description
    content
    contentType
    displayType
    heart
    published_at
    category {
      id
    }
    story {
      id
      name
    }
    storySeq
    image {
      id
      url
      provider
      formats
    }
    user {
      id
      username
      avatar {
        url
        formats
        alternativeText
      }
    }
    nextPost {
      ...PostsConnectionFragment
    }
  }
}
    ${PostsConnectionFragmentFragmentDoc}`;

/**
 * __usePostBySlugQuery__
 *
 * To run a query within a React component, call `usePostBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePostBySlugQuery(baseOptions: Apollo.QueryHookOptions<PostBySlugQuery, PostBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostBySlugQuery, PostBySlugQueryVariables>(PostBySlugDocument, options);
      }
export function usePostBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostBySlugQuery, PostBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostBySlugQuery, PostBySlugQueryVariables>(PostBySlugDocument, options);
        }
export type PostBySlugQueryHookResult = ReturnType<typeof usePostBySlugQuery>;
export type PostBySlugLazyQueryHookResult = ReturnType<typeof usePostBySlugLazyQuery>;
export type PostBySlugQueryResult = Apollo.QueryResult<PostBySlugQuery, PostBySlugQueryVariables>;
export const PostsByStoryDocument = gql`
    query PostsByStory($limit: Int = 100, $story: ID!) {
  posts(limit: $limit, sort: "storySeq:asc", where: {story: $story}) {
    id
    title
    storySeq
  }
}
    `;

/**
 * __usePostsByStoryQuery__
 *
 * To run a query within a React component, call `usePostsByStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByStoryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      story: // value for 'story'
 *   },
 * });
 */
export function usePostsByStoryQuery(baseOptions: Apollo.QueryHookOptions<PostsByStoryQuery, PostsByStoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByStoryQuery, PostsByStoryQueryVariables>(PostsByStoryDocument, options);
      }
export function usePostsByStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByStoryQuery, PostsByStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByStoryQuery, PostsByStoryQueryVariables>(PostsByStoryDocument, options);
        }
export type PostsByStoryQueryHookResult = ReturnType<typeof usePostsByStoryQuery>;
export type PostsByStoryLazyQueryHookResult = ReturnType<typeof usePostsByStoryLazyQuery>;
export type PostsByStoryQueryResult = Apollo.QueryResult<PostsByStoryQuery, PostsByStoryQueryVariables>;
export const PostsConnectionDocument = gql`
    query PostsConnection($sort: String = "published_at:desc", $start: Int, $where: JSON) {
  postsConnection(sort: $sort, limit: 10, start: $start, where: $where) {
    values {
      ...PostsConnectionFragment
    }
    aggregate {
      count
      totalCount
    }
  }
}
    ${PostsConnectionFragmentFragmentDoc}`;

/**
 * __usePostsConnectionQuery__
 *
 * To run a query within a React component, call `usePostsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsConnectionQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      start: // value for 'start'
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePostsConnectionQuery(baseOptions?: Apollo.QueryHookOptions<PostsConnectionQuery, PostsConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsConnectionQuery, PostsConnectionQueryVariables>(PostsConnectionDocument, options);
      }
export function usePostsConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsConnectionQuery, PostsConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsConnectionQuery, PostsConnectionQueryVariables>(PostsConnectionDocument, options);
        }
export type PostsConnectionQueryHookResult = ReturnType<typeof usePostsConnectionQuery>;
export type PostsConnectionLazyQueryHookResult = ReturnType<typeof usePostsConnectionLazyQuery>;
export type PostsConnectionQueryResult = Apollo.QueryResult<PostsConnectionQuery, PostsConnectionQueryVariables>;
export const PublishPostDocument = gql`
    mutation PublishPost($id: ID!) {
  publishPost(id: $id) {
    id
    slug
    published_at
  }
}
    `;
export type PublishPostMutationFn = Apollo.MutationFunction<PublishPostMutation, PublishPostMutationVariables>;

/**
 * __usePublishPostMutation__
 *
 * To run a mutation, you first call `usePublishPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishPostMutation, { data, loading, error }] = usePublishPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishPostMutation(baseOptions?: Apollo.MutationHookOptions<PublishPostMutation, PublishPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishPostMutation, PublishPostMutationVariables>(PublishPostDocument, options);
      }
export type PublishPostMutationHookResult = ReturnType<typeof usePublishPostMutation>;
export type PublishPostMutationResult = Apollo.MutationResult<PublishPostMutation>;
export type PublishPostMutationOptions = Apollo.BaseMutationOptions<PublishPostMutation, PublishPostMutationVariables>;
export const UnPublishPostDocument = gql`
    mutation UnPublishPost($id: ID!) {
  unPublishPost(id: $id) {
    id
    slug
    published_at
  }
}
    `;
export type UnPublishPostMutationFn = Apollo.MutationFunction<UnPublishPostMutation, UnPublishPostMutationVariables>;

/**
 * __useUnPublishPostMutation__
 *
 * To run a mutation, you first call `useUnPublishPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnPublishPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unPublishPostMutation, { data, loading, error }] = useUnPublishPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnPublishPostMutation(baseOptions?: Apollo.MutationHookOptions<UnPublishPostMutation, UnPublishPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnPublishPostMutation, UnPublishPostMutationVariables>(UnPublishPostDocument, options);
      }
export type UnPublishPostMutationHookResult = ReturnType<typeof useUnPublishPostMutation>;
export type UnPublishPostMutationResult = Apollo.MutationResult<UnPublishPostMutation>;
export type UnPublishPostMutationOptions = Apollo.BaseMutationOptions<UnPublishPostMutation, UnPublishPostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($input: updatePostInput) {
  updatePost(input: $input) {
    post {
      id
      slug
      image {
        id
        url
        provider
        formats
      }
      title
      description
      content
      contentType
      displayType
      category {
        id
        name
      }
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CreateStoryDocument = gql`
    mutation CreateStory($input: createStoryInput!) {
  createStory(input: $input) {
    story {
      id
      name
      description
    }
  }
}
    `;
export type CreateStoryMutationFn = Apollo.MutationFunction<CreateStoryMutation, CreateStoryMutationVariables>;

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoryMutation, CreateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument, options);
      }
export type CreateStoryMutationHookResult = ReturnType<typeof useCreateStoryMutation>;
export type CreateStoryMutationResult = Apollo.MutationResult<CreateStoryMutation>;
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<CreateStoryMutation, CreateStoryMutationVariables>;
export const StoriesConnectionDocument = gql`
    query StoriesConnection($start: Int = 0, $search: String = "", $user: String!) {
  storiesConnection(start: $start, where: {name_contains: $search, user: $user}) {
    values {
      id
      name
    }
    aggregate {
      totalCount
    }
  }
}
    `;

/**
 * __useStoriesConnectionQuery__
 *
 * To run a query within a React component, call `useStoriesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoriesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoriesConnectionQuery({
 *   variables: {
 *      start: // value for 'start'
 *      search: // value for 'search'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useStoriesConnectionQuery(baseOptions: Apollo.QueryHookOptions<StoriesConnectionQuery, StoriesConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoriesConnectionQuery, StoriesConnectionQueryVariables>(StoriesConnectionDocument, options);
      }
export function useStoriesConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoriesConnectionQuery, StoriesConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoriesConnectionQuery, StoriesConnectionQueryVariables>(StoriesConnectionDocument, options);
        }
export type StoriesConnectionQueryHookResult = ReturnType<typeof useStoriesConnectionQuery>;
export type StoriesConnectionLazyQueryHookResult = ReturnType<typeof useStoriesConnectionLazyQuery>;
export type StoriesConnectionQueryResult = Apollo.QueryResult<StoriesConnectionQuery, StoriesConnectionQueryVariables>;
export const StoryDocument = gql`
    query Story($id: ID!) {
  story(id: $id) {
    id
    name
    description
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
 *      id: // value for 'id'
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
export const FilesDocument = gql`
    query Files($sort: String, $limit: Int, $start: Int, $where: JSON) {
  files(sort: $sort, limit: $limit, start: $start, where: $where) {
    id
    url
    formats
    provider
  }
}
    `;

/**
 * __useFilesQuery__
 *
 * To run a query within a React component, call `useFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      start: // value for 'start'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFilesQuery(baseOptions?: Apollo.QueryHookOptions<FilesQuery, FilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options);
      }
export function useFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options);
        }
export type FilesQueryHookResult = ReturnType<typeof useFilesQuery>;
export type FilesLazyQueryHookResult = ReturnType<typeof useFilesLazyQuery>;
export type FilesQueryResult = Apollo.QueryResult<FilesQuery, FilesQueryVariables>;
export const FilesConnectionDocument = gql`
    query FilesConnection($sort: String, $limit: Int, $start: Int, $where: JSON) {
  filesConnection(sort: $sort, limit: $limit, start: $start, where: $where) {
    values {
      id
      name
      size
      ext
      mime
      width
      height
      formats
      url
      provider
    }
    aggregate {
      count
      totalCount
    }
  }
}
    `;

/**
 * __useFilesConnectionQuery__
 *
 * To run a query within a React component, call `useFilesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesConnectionQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      start: // value for 'start'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFilesConnectionQuery(baseOptions?: Apollo.QueryHookOptions<FilesConnectionQuery, FilesConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilesConnectionQuery, FilesConnectionQueryVariables>(FilesConnectionDocument, options);
      }
export function useFilesConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilesConnectionQuery, FilesConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilesConnectionQuery, FilesConnectionQueryVariables>(FilesConnectionDocument, options);
        }
export type FilesConnectionQueryHookResult = ReturnType<typeof useFilesConnectionQuery>;
export type FilesConnectionLazyQueryHookResult = ReturnType<typeof useFilesConnectionLazyQuery>;
export type FilesConnectionQueryResult = Apollo.QueryResult<FilesConnectionQuery, FilesConnectionQueryVariables>;
export const MutipleUploadDocument = gql`
    mutation MutipleUpload($files: [Upload]!) {
  multipleUpload(files: $files) {
    id
  }
}
    `;
export type MutipleUploadMutationFn = Apollo.MutationFunction<MutipleUploadMutation, MutipleUploadMutationVariables>;

/**
 * __useMutipleUploadMutation__
 *
 * To run a mutation, you first call `useMutipleUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutipleUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutipleUploadMutation, { data, loading, error }] = useMutipleUploadMutation({
 *   variables: {
 *      files: // value for 'files'
 *   },
 * });
 */
export function useMutipleUploadMutation(baseOptions?: Apollo.MutationHookOptions<MutipleUploadMutation, MutipleUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutipleUploadMutation, MutipleUploadMutationVariables>(MutipleUploadDocument, options);
      }
export type MutipleUploadMutationHookResult = ReturnType<typeof useMutipleUploadMutation>;
export type MutipleUploadMutationResult = Apollo.MutationResult<MutipleUploadMutation>;
export type MutipleUploadMutationOptions = Apollo.BaseMutationOptions<MutipleUploadMutation, MutipleUploadMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    avatar {
      url
      formats
      alternativeText
    }
  }
}
    `;

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