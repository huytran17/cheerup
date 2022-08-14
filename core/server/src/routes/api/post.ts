import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import { getPostRules } from "../../data-access/controllers/user/post/validators";
import {
  getPostsController,
  getPostController,
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

export default postRouter;
