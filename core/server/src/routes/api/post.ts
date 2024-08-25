import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import {
  exportPostPdfController,
  getPostBySlugController,
  getPostsController,
  getPostsPaginatedController,
  getSuggestionPostsController,
  increasePostViewsController,
} from "../../data-access/controllers/user/post";
import {
  exportPostPdfRules,
  getPostBySlugRules,
  getPostsPaginatedRules,
  getSuggestionPostsRules,
  increasePostViewsRules,
} from "../../data-access/controllers/user/post/validators";

const postRouter = Router();

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

postRouter.get("/", makeExpressCallback(getPostsController));

export default postRouter;
