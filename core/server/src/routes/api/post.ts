import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostRules,
  getSuggestionPostsRules,
  getPostsPaginatedRules,
  updatePostRules,
  exportPostPdfRules,
  getPostBySlugRules,
  increasePostViewsRules,
} from "../../data-access/controllers/user/post/validators";
import {
  getPostsController,
  getPostController,
  getSuggestionPostsController,
  getPostsPaginatedController,
  updatePostController,
  exportPostPdfController,
  getPostBySlugController,
  increasePostViewsController,
} from "../../data-access/controllers/user/post";

const postRouter = express.Router();

postRouter.put(
  "/increase-post-views/:_id",
  makeValidator(increasePostViewsRules),
  makeExpressCallback(increasePostViewsController)
);

postRouter.get(
  "/by-slug/:slug",
  makeValidator(getPostBySlugRules),
  makeExpressCallback(getPostBySlugController)
);

postRouter.put(
  "/:_id",
  makeValidator(updatePostRules),
  makeExpressCallback(updatePostController)
);

postRouter.get(
  "/export-pdf/:_id",
  makeValidator(exportPostPdfRules),
  makeExpressCallback(exportPostPdfController)
);

postRouter.get(
  "/suggestion-posts",
  makeValidator(getSuggestionPostsRules),
  makeExpressCallback(getSuggestionPostsController)
);

postRouter.get(
  "/all-paginated",
  makeValidator(getPostsPaginatedRules),
  makeExpressCallback(getPostsPaginatedController)
);

postRouter.get(
  "/:_id",
  makeValidator(getPostRules),
  makeExpressCallback(getPostController)
);

postRouter.get(
  "/",
  makeValidator(getPostRules),
  makeExpressCallback(getPostsController)
);

export default postRouter;
