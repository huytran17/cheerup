import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostRules,
  getSuggestionPostsRules,
  getPostsPaginatedRules,
  updatePostRules,
} from "../../data-access/controllers/user/post/validators";
import {
  getPostsController,
  getPostController,
  getSuggestionPostsController,
  getPostsPaginatedController,
  updatePostController,
} from "../../data-access/controllers/user/post";

const postRouter = express.Router();

postRouter.put(
  "/:_id",
  makeValidator(updatePostRules),
  makeExpressCallback(updatePostController)
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
