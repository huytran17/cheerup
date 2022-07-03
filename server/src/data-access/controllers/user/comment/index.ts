import {
  getComment,
  deleteComment,
  updateComment,
} from "../../../../use-cases/comment";
import { logger } from "../../../../config/storage/logger";

import makeGetCommentController from "./get-comment";
import makeDeleteComment from "./delete-comment";
import makeUpdateComment from "./update-comment";

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
});

export {
  getCommentController,
  deleteCommentController,
  updateCommentController,
};
