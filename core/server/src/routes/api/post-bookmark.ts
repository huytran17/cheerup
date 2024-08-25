import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import {
  countPostBookmarkController,
  createOrDeletePostBookmarkController,
  getPostBookmarksPaginatedController,
} from "../../data-access/controllers/user/post-bookmark";
import {
  createOrDeletePostBookmarkRules,
  getPostBookmarksPaginatedRules,
} from "../../data-access/controllers/user/post-bookmark/validators";

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
