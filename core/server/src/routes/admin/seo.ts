import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import {
  getCategoriesForSEOController,
  getPostsForSEOController,
} from "../../data-access/controllers/admin/seo";

const seoRouter = Router();

seoRouter.get("/posts", makeExpressCallback(getPostsForSEOController));

seoRouter.get(
  "/categories",
  makeExpressCallback(getCategoriesForSEOController)
);

export default seoRouter;
