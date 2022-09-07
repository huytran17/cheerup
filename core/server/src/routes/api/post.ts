import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostRules,
  getLatestPostsRules,
} from "../../data-access/controllers/user/post/validators";
import {
  getPostsController,
  getPostController,
  getLatestPostsController,
} from "../../data-access/controllers/user/post";

const postRouter = express.Router();

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

postRouter.get(
  "/latest",
  makeValidator(getLatestPostsRules),
  makeExpressCallback(getLatestPostsController)
); // DONE

export default postRouter;
