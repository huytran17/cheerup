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
  hardDeletePostRules,
  publishPostRules,
  unPublishPostRules,
  highlightPostRules,
  unHighlightPostRules,
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
  hardDeletePostController,
  publishPostController,
  unPublishPostController,
  getPostAnalysticsController,
  hightlightPostController,
  unHightlightPostController,
} from "../../data-access/controllers/admin/post";

const postRouter = express.Router();

postRouter.get("/analystics", makeExpressCallback(getPostAnalysticsController));

postRouter.put(
  "/un-highlight/:_id",
  makeValidator(unHighlightPostRules),
  makeExpressCallback(unHightlightPostController)
);

postRouter.put(
  "/highlight/:_id",
  makeValidator(highlightPostRules),
  makeExpressCallback(hightlightPostController)
);

postRouter.put(
  "/publish/:_id",
  makeValidator(publishPostRules),
  makeExpressCallback(publishPostController)
);

postRouter.put(
  "/un-publish/:_id",
  makeValidator(unPublishPostRules),
  makeExpressCallback(unPublishPostController)
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
  upload.single("file"),
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
