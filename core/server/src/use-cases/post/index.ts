import { logger } from "../../config/storage/logger";

import { PostDb } from "../../data-access";

import makeGetPost from "./get-post";
import makeDeletePost from "./delete-post";
import makeUpdatePost from "./update-post";
import makeCreatePost from "./create-post";
import makeGetPosts from "./get-posts";

const getPost = makeGetPost({
  postDb: PostDb,
  logger,
});

const deletePost = makeDeletePost({
  postDb: PostDb,
});

const updatePost = makeUpdatePost({
  postDb: PostDb,
});

const createPost = makeCreatePost({
  postDb: PostDb,
});

const getPosts = makeGetPosts({
  postDb: PostDb,
  logger,
});

const postServices = Object.freeze({
  getPost,
  deletePost,
  updatePost,
  getPosts,
  createPost,
});

export default postServices;

export { getPost, deletePost, updatePost, getPosts, createPost };
