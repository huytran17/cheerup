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
  });

export default Object.freeze({
  createOrUpdateCommentLikeController,
});

export { createOrUpdateCommentLikeController };
