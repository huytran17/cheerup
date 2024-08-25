import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import {
  blockPostCommentController,
  createPostController,
  deletePostController,
  getMostPopularPostsAnalysticsController,
  getPostAnalysticsController,
  getPostController,
  getPostsController,
  hardDeletePostController,
  restorePostController,
  unblockPostCommentController,
  updatePostController,
  uploadPostThumbnailController,
} from "../../data-access/controllers/admin/post";
import {
  blockPostCommentRules,
  createPostRules,
  deletePostRules,
  getMostPopularPostsAnalysticsRules,
  getPostAnalysticsRules,
  getPostRules,
  hardDeletePostRules,
  restorePostRules,
  unBlockPostCommentRules,
  updatePostRules,
  uploadPostThumbnailRules,
} from "../../data-access/controllers/admin/post/validators";

const postRouter = Router();

postRouter.get(
  "/analystics",
  makeValidator(getPostAnalysticsRules),
  makeExpressCallback(getPostAnalysticsController)
);

postRouter.get(
  "/most-popular-posts-analystics",
  makeValidator(getMostPopularPostsAnalysticsRules),
  makeExpressCallback(getMostPopularPostsAnalysticsController)
);

postRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeletePostRules),
  makeExpressCallback(hardDeletePostController)
);

postRouter.put(
  "/block-comment/:_id",
  makeValidator(blockPostCommentRules),
  makeExpressCallback(blockPostCommentController)
);

postRouter.put(
  "/un-block-comment/:_id",
  makeValidator(unBlockPostCommentRules),
  makeExpressCallback(unblockPostCommentController)
);

postRouter.put(
  "/restore/:_id",
  makeValidator(restorePostRules),
  makeExpressCallback(restorePostController)
);

postRouter.post(
  "/upload-thumbnail/:_id",
  makeValidator(uploadPostThumbnailRules),
  makeExpressCallback(uploadPostThumbnailController)
);

postRouter.get(
  "/:_id",
  makeValidator(getPostRules),
  makeExpressCallback(getPostController)
);

postRouter.delete(
  "/:_id",
  makeValidator(deletePostRules),
  makeExpressCallback(deletePostController)
);

postRouter.put(
  "/:_id",
  makeValidator(updatePostRules),
  makeExpressCallback(updatePostController)
);

postRouter.post(
  "/",
  makeValidator(createPostRules),
  makeExpressCallback(createPostController)
);

postRouter.get("/", makeExpressCallback(getPostsController));

export default postRouter;
