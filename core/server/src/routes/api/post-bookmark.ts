import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  createPostBookmarkRules,
  hardDeletePostBookmarkRules,
  getPostBookmarksPaginatedRules,
} from "../../data-access/controllers/user/post-bookmark/validators";
import {
  createPostBookmarkController,
  hardDeletePostBookmarkController,
  getPostBookmarksPaginatedController,
} from "../../data-access/controllers/user/post-bookmark";

const postBookmarkRouter = express.Router();

postBookmarkRouter.get(
  "/all-paginated",
  makeValidator(getPostBookmarksPaginatedRules),
  makeExpressCallback(getPostBookmarksPaginatedController)
); // DONE

postBookmarkRouter.delete(
  "/:_id",
  makeValidator(hardDeletePostBookmarkRules),
  makeExpressCallback(hardDeletePostBookmarkController)
); // DONE

postBookmarkRouter.post(
  "/",
  makeValidator(createPostBookmarkRules),
  makeExpressCallback(createPostBookmarkController)
); // DONE

export default postBookmarkRouter;
