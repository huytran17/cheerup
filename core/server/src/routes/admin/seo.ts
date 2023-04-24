import express from "express";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostsForSEOController,
  getCategoriesForSEOController,
} from "../../data-access/controllers/admin/seo";

const seoRouter = express.Router();

seoRouter.get("/posts", makeExpressCallback(getPostsForSEOController));

seoRouter.get(
  "/categories",
  makeExpressCallback(getCategoriesForSEOController)
);

export default seoRouter;
