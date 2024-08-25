import {
  countCommentsByPost,
  createComment,
  getComment,
  getCommentsByParent,
  getCommentsByPostPaginated,
  hardDeleteComment,
  replyComment,
  updateComment,
} from "../../../../use-cases/comment";
import {
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
} from "../../../../use-cases/comment-like";
import { getPost } from "../../../../use-cases/post";
import { getLatestSystemConfiguration } from "../../../../use-cases/system-configuration";
import makeCountCommentsByPostController from "./count-comments-by-post";
import makeCreateCommentController from "./create-comment";
import makeGetCommentController from "./get-comment";
import makeGetCommentsByParentController from "./get-comments-by-parent";
import makeGetCommentsByPostPaginatedController from "./get-comments-by-post-paginated";
import makeHardDeleteCommentController from "./hard-delete-comment";
import makeReplyCommentController from "./reply-comment";
import makeUpdateCommentController from "./update-comment";

const getCommentsByParentController = makeGetCommentsByParentController({
  getCommentsByParent,
  getComment,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
});

const countCommentsByPostController = makeCountCommentsByPostController({
  countCommentsByPost,
  getPost,
});

const replyCommentController = makeReplyCommentController({
  replyComment,
  getComment,
  updateComment,
  getPost,
});

const getCommentsByPostPaginatedController =
  makeGetCommentsByPostPaginatedController({
    getCommentsByPostPaginated,
    getPost,
    countCommentLikeByCommentAndType,
    getCommentLikeByUserAndComment,
  });

const createCommentController = makeCreateCommentController({
  createComment,
  getPost,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
  getLatestSystemConfiguration,
});

const getCommentController = makeGetCommentController({
  getComment,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
});

const hardDeleteCommentController = makeHardDeleteCommentController({
  getComment,
  hardDeleteComment,
  getPost,
});

const updateCommentController = makeUpdateCommentController({
  getComment,
  updateComment,
  getPost,
});

export default Object.freeze({
  getCommentController,
  hardDeleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsByPostPaginatedController,
  replyCommentController,
  countCommentsByPostController,
  getCommentsByParentController,
});

export {
  countCommentsByPostController,
  createCommentController,
  getCommentController,
  getCommentsByParentController,
  getCommentsByPostPaginatedController,
  hardDeleteCommentController,
  replyCommentController,
  updateCommentController,
};
