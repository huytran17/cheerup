import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import { upload } from "../../config/middlewares/file-upload-middleware";

import {
  getPostRules,
  deletePostRules,
  updatePostRules,
  createPostRules,
  uploadPostThumbnailRules,
  restorePostRules,
  blockPostCommentRules,
  unBlockPostCommentRules,
} from "../../data-access/controllers/admin/post/validators";
import {
  getPostController,
  deletePostController,
  updatePostController,
  createPostController,
  getPostsController,
  uploadPostThumbnailController,
  restorePostController,
  unblockPostCommentController,
  blockPostCommentController,
} from "../../data-access/controllers/admin/post";

const postRouter = express.Router();

postRouter.put(
  "/block-comment/:_id",
  makeValidator(blockPostCommentRules),
  makeExpressCallback(blockPostCommentController)
); // DONE

postRouter.put(
  "/un-block-comment/:_id",
  makeValidator(unBlockPostCommentRules),
  makeExpressCallback(unblockPostCommentController)
); // DONE

postRouter.put(
  "/restore/:_id",
  makeValidator(restorePostRules),
  makeExpressCallback(restorePostController)
); // DONE

postRouter.post(
  "/upload-thumbnail/:_id",
  upload.single("file"),
  makeValidator(uploadPostThumbnailRules),
  makeExpressCallback(uploadPostThumbnailController)
);

postRouter.get(
  "/:_id",
  makeValidator(getPostRules),
  makeExpressCallback(getPostController)
); // DONE

postRouter.delete(
  "/:_id",
  makeValidator(deletePostRules),
  makeExpressCallback(deletePostController)
); // DONE

postRouter.put(
  "/:_id",
  makeValidator(updatePostRules),
  makeExpressCallback(updatePostController)
); // DONE

postRouter.post(
  "/",
  makeValidator(createPostRules),
  makeExpressCallback(createPostController)
); // DONE

postRouter.get("/", makeExpressCallback(getPostsController)); // DONE

export default postRouter;
