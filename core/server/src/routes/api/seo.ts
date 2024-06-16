import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostsForSEOController,
  getCategoriesForSEOController,
} from "../../data-access/controllers/user/seo";

const seoRouter = Router();

seoRouter.get("/posts", makeExpressCallback(getPostsForSEOController));

seoRouter.get(
  "/categories",
  makeExpressCallback(getCategoriesForSEOController)
);

export default seoRouter;
