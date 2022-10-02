import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostBookmarksPaginatedRules,
  createOrDeletePostBookmarkRules,
} from "../../data-access/controllers/user/post-bookmark/validators";
import {
  getPostBookmarksPaginatedController,
  createOrDeletePostBookmarkController,
  countPostBookmarkController,
} from "../../data-access/controllers/user/post-bookmark";

const postBookmarkRouter = express.Router();

postBookmarkRouter.get(
  "/count-post-bookmarks",
  makeExpressCallback(countPostBookmarkController)
); // DONE

postBookmarkRouter.get(
  "/all-paginated",
  makeValidator(getPostBookmarksPaginatedRules),
  makeExpressCallback(getPostBookmarksPaginatedController)
); // DONE

postBookmarkRouter.put(
  "/create-or-delete",
  makeValidator(createOrDeletePostBookmarkRules),
  makeExpressCallback(createOrDeletePostBookmarkController)
); // DONE

export default postBookmarkRouter;
