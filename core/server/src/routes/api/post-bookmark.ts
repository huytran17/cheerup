import { Router } from "express";
import makeValidator from "../../config/middlewares/validator";
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

const postBookmarkRouter = Router();

postBookmarkRouter.get(
  "/count-post-bookmarks",
  makeExpressCallback(countPostBookmarkController)
);

postBookmarkRouter.get(
  "/all-paginated",
  makeValidator(getPostBookmarksPaginatedRules),
  makeExpressCallback(getPostBookmarksPaginatedController)
);

postBookmarkRouter.put(
  "/create-or-delete",
  makeValidator(createOrDeletePostBookmarkRules),
  makeExpressCallback(createOrDeletePostBookmarkController)
);

export default postBookmarkRouter;
