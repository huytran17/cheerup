import {
  getComment,
  hardDeleteComment,
  updateComment,
  createComment,
  getComments,
} from "../../../../use-cases/comment";

import makeGetCommentsController from "./get-comments";
import makeGetCommentController from "./get-comment";
import makeHardDeleteCommentController from "./hard-delete-comment";
import makeUpdateCommentController from "./update-comment";
import makeCreateCommentController from "./create-comment";

const getCommentsController = makeGetCommentsController({
  getComments,
});

const createCommentController = makeCreateCommentController({
  createComment,
});

const getCommentController = makeGetCommentController({
  getComment,
});

const hardDeleteCommentController = makeHardDeleteCommentController({
  getComment,
  hardDeleteComment,
});

const updateCommentController = makeUpdateCommentController({
  getComment,
  updateComment,
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
