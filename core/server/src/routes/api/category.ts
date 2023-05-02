import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";

import {
  getCategoryRules,
  getOutstandingCategoriesPaginatedRules,
  getCategoryBySlugRules,
} from "../../data-access/controllers/user/category/validators";
import {
  getCategoriesController,
  getCategoryController,
  getCategoryTitlesController,
  getOutstandingCategoriesPaginatedController,
  getCategoryBySlugController,
} from "../../data-access/controllers/user/category";

const categoryRouter = express.Router();

categoryRouter.get(
  "/by-slug/:slug",
  makeValidator(getCategoryBySlugRules),
  makeExpressCallback(getCategoryBySlugController)
);

categoryRouter.get("/titles", makeExpressCallback(getCategoryTitlesController));

categoryRouter.get(
  "/outstanding-paginated",
  makeValidator(getOutstandingCategoriesPaginatedRules),
  makeExpressCallback(getOutstandingCategoriesPaginatedController)
);

categoryRouter.get(
  "/:_id",
  makeValidator(getCategoryRules),
  makeExpressCallback(getCategoryController)
);

categoryRouter.get("/", makeExpressCallback(getCategoriesController));

export default categoryRouter;
