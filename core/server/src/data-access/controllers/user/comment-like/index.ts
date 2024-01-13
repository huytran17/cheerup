import { getComment } from "../../../../use-cases/comment";
import {
  createCommentLike,
  getCommentLikeByUserAndComment,
  hardDeleteCommentLike,
  updateCommentLike,
} from "../../../../use-cases/comment-like";
import makeCreateOrUpdateCommentLikeController from "./create-or-update-comment-like";

const createOrUpdateCommentLikeController =
  makeCreateOrUpdateCommentLikeController({
    createCommentLike,
    updateCommentLike,
    hardDeleteCommentLike,
    getComment,
    getCommentLikeByUserAndComment,
  });

export default Object.freeze({
  createOrUpdateCommentLikeController,
});

export { createOrUpdateCommentLikeController };
