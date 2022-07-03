import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostRules,
  deletePostRules,
  updatePostRules,
  createPostRules,
} from "../../data-access/controllers/admin/post/validators";
import {
  getPostController,
  deletePostController,
  updatePostController,
  createPostController,
  getPostsController,
} from "../../data-access/controllers/admin/post";

const categoryRouter = express.Router();

categoryRouter.get(
  "/:_id",
  makeValidator(getPostRules),
  makeExpressCallback(getPostController)
); // DONE

categoryRouter.delete(
  "/:_id",
  makeValidator(deletePostRules),
  makeExpressCallback(deletePostController)
); // DONE

categoryRouter.put(
  "/:_id",
  makeValidator(updatePostRules),
  makeExpressCallback(updatePostController)
); // DONE

categoryRouter.post(
  "/",
  makeValidator(createPostRules),
  makeExpressCallback(createPostController)
); // DONE

categoryRouter.get("/", makeExpressCallback(getPostsController)); // DONE

export default categoryRouter;
