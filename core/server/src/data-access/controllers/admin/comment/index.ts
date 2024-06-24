import {
  createComment,
  getComment,
  getComments,
  hardDeleteComment,
  updateComment,
} from "../../../../use-cases/comment";
import makeCreateCommentController from "./create-comment";
import makeGetCommentController from "./get-comment";
import makeGetCommentsController from "./get-comments";
import makeHardDeleteCommentController from "./hard-delete-comment";
import makeUpdateCommentController from "./update-comment";

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
  createCommentController,
  getCommentController,
  getCommentsController,
  hardDeleteCommentController,
  updateCommentController,
};
