import { logger } from "../../../../config/logs/logger";
import { getUser } from "../../../../use-cases/user";
import {
  createCommentLike,
  updateCommentLike,
  hardDeleteCommentLike,
  getCommentLikeByUserAndComment,
} from "../../../../use-cases/comment-like";
import { getComment } from "../../../../use-cases/comment";

import makeCreateOrUpdateCommentLikeController from "./create-or-update-comment-like";

const createOrUpdateCommentLikeController =
  makeCreateOrUpdateCommentLikeController({
    createCommentLike,
    updateCommentLike,
    hardDeleteCommentLike,
    getUser,
    getComment,
    getCommentLikeByUserAndComment,
    logger,
  });

export default Object.freeze({
  createOrUpdateCommentLikeController,
});

export { createOrUpdateCommentLikeController };
