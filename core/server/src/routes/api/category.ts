import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import {
  getCategoryBySlugController,
  getCategoryTitlesController,
  getOutstandingCategoriesPaginatedController,
} from "../../data-access/controllers/user/category";
import {
  getCategoryBySlugRules,
  getOutstandingCategoriesPaginatedRules,
} from "../../data-access/controllers/user/category/validators";

const categoryRouter = Router();

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

export default categoryRouter;
