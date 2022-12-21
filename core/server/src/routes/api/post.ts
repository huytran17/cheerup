import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostRules,
  getSuggestionPostsRules,
  getPostsPaginatedRules,
} from "../../data-access/controllers/user/post/validators";
import {
  getPostsController,
  getPostController,
  getSuggestionPostsController,
  getPostsPaginatedController,
} from "../../data-access/controllers/user/post";

const postRouter = express.Router();

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
