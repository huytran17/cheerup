import { logger } from "../../../../config/logs/logger";
import { getUser } from "../../../../use-cases/user";
import {
  createCommentLike,
  updateCommentLike,
  getCommentLikeByUserAndComment,
} from "../../../../use-cases/comment-like";
import { getComment } from "../../../../use-cases/comment";

import makeCreateCommentLikeController from "./create-or-update-comment-like";

const createCommentLikeController = makeCreateCommentLikeController({
  createCommentLike,
  updateCommentLike,
  getUser,
  getComment,
  getCommentLikeByUserAndComment,
  logger,
});

export default Object.freeze({
  createCommentLikeController,
});

export { createCommentLikeController };
