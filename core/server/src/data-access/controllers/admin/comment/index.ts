import {
  getComment,
  getComments,
  hardDeleteComment,
} from "../../../../use-cases/comment";
import makeGetCommentsController from "./get-comments";
import makeHardDeleteCommentController from "./hard-delete-comment";

const getCommentsController = makeGetCommentsController({
  getComments,
});

const hardDeleteCommentController = makeHardDeleteCommentController({
  getComment,
  hardDeleteComment,
});

export default Object.freeze({
  hardDeleteCommentController,
  getCommentsController,
});

export { getCommentsController, hardDeleteCommentController };
