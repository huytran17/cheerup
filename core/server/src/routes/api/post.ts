import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostRules,
  getLatestPostsRules,
  getPostsPaginatedRules,
} from "../../data-access/controllers/user/post/validators";
import {
  getPostsController,
  getPostController,
  getLatestPostsController,
  getPostsPaginatedController,
} from "../../data-access/controllers/user/post";

const postRouter = express.Router();

postRouter.get(
  "/latest-posts",
  makeValidator(getLatestPostsRules),
  makeExpressCallback(getLatestPostsController)
); // DONE

postRouter.get(
  "/all-paginated",
  makeValidator(getPostsPaginatedRules),
  makeExpressCallback(getPostsPaginatedController)
); // DONE

postRouter.get(
  "/:post_id",
  makeValidator(getPostRules),
  makeExpressCallback(getPostController)
); // DONE

postRouter.get(
  "/",
  makeValidator(getPostRules),
  makeExpressCallback(getPostsController)
); // DONE

export default postRouter;
