import {
  getComment,
  deleteComment,
  updateComment,
  createComment,
} from "../../../../use-cases/comment";
import { logger } from "../../../../config/storage/logger";

import makeGetCommentController from "./get-comment";
import makeDeleteComment from "./delete-comment";
import makeUpdateComment from "./update-comment";
import makeCreateComment from "./create-comment";

const createCommentController = makeCreateComment({
  createComment,
  logger,
});

const getCommentController = makeGetCommentController({
  getComment,
  logger,
});

const deleteCommentController = makeDeleteComment({
  getComment,
  deleteComment,
  logger,
});

const updateCommentController = makeUpdateComment({
  getComment,
  updateComment,
  logger,
});

export default Object.freeze({
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
});

export {
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
};
