import {
  getComment,
  hardDeleteComment,
  updateComment,
  createComment,
  getComments,
} from "../../../../use-cases/comment";
import { logger } from "../../../../config/logs/logger";

import makeGetCommentsController from "./get-comments";
import makeGetCommentController from "./get-comment";
import makeHardDeleteCommentController from "./hard-delete-comment";
import makeUpdateCommentController from "./update-comment";
import makeCreateCommentController from "./create-comment";

const getCommentsController = makeGetCommentsController({
  getComments,
  logger,
});

const createCommentController = makeCreateCommentController({
  createComment,
  logger,
});

const getCommentController = makeGetCommentController({
  getComment,
  logger,
});

const hardDeleteCommentController = makeHardDeleteCommentController({
  getComment,
  hardDeleteComment,
  logger,
});

const updateCommentController = makeUpdateCommentController({
  getComment,
  updateComment,
  logger,
});

export default Object.freeze({
  getCommentController,
  hardDeleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
});

export {
  getCommentController,
  hardDeleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
};
