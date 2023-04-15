import express from "express";
import makeExpressCallback from "../../config/express-callback";

import {
  getPostsForSEOController,
  getCategoriesForSEOController,
} from "../../data-access/controllers/user/seo";

const seoRouter = express.Router();

seoRouter.post("/posts", makeExpressCallback(getPostsForSEOController));

seoRouter.post(
  "/categories",
  makeExpressCallback(getCategoriesForSEOController)
);

export default seoRouter;
