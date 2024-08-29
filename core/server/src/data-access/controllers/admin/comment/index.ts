import {
  getComment,
  getComments,
  getCommentsPaginated,
  hardDeleteComment,
} from "../../../../use-cases/comment";
import makeGetCommentsController from "./get-comments";
import makeGetCommentsPaginatedController from "./get-comments-paginated";
import makeHardDeleteCommentController from "./hard-delete-comment";

const getCommentsPaginatedController = makeGetCommentsPaginatedController({
  getCommentsPaginated,
});

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
  getCommentsPaginatedController,
});

export {
  getCommentsController,
  getCommentsPaginatedController,
  hardDeleteCommentController,
};
