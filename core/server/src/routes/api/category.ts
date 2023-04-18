import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";

import {
  getCategoryRules,
  getOutstandingCategoriesPaginatedRules,
} from "../../data-access/controllers/user/category/validators";
import {
  getCategoriesController,
  getCategoryController,
  getCategoryTitlesController,
  getOutstandingCategoriesPaginatedController,
} from "../../data-access/controllers/user/category";

const categoryRouter = express.Router();

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
