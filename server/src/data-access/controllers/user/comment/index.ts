import {
  getComment,
  deleteComment,
  updateComment,
  createComment,
} from "../../../../use-cases/comment";
import { logger } from "../../../../config/storage/logger";

import makeGetCommentController from "./get-comment";
import makeDeleteCommentController from "./delete-comment";
import makeUpdateCommentController from "./update-comment";
import makeCreateCommentController from "./create-comment";

const createCommentController = makeCreateCommentController({
  createComment,
  logger,
});

const getCommentController = makeGetCommentController({
  getComment,
  logger,
});

const deleteCommentController = makeDeleteCommentController({
  getComment,
  deleteComment,
  logger,
});

const updateCommentController = makeUpdateCommentController({
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
