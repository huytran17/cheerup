import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { PostDb } from "../../data-access";

import makeGetPost from "./get-post";
import makeDeletePost from "./delete-post";
import makeUpdatePost from "./update-post";
import makeGetCategories from "./get-posts";

const getPost = makeGetPost({
  postDb: PostDb,
  redis,
  logger,
});

const deletePost = makeDeletePost({
  postDb: PostDb,
});

const updatePost = makeUpdatePost({
  postDb: PostDb,
});

const getCategories = makeGetCategories({
  postDb: PostDb,
  redis,
  logger,
});

const postServices = Object.freeze({
  getPost,
  deletePost,
  updatePost,
  getCategories,
});

export default postServices;

export { getPost, deletePost, updatePost, getCategories };
