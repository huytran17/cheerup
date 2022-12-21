import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import { getCategoryRules } from "../../data-access/controllers/user/category/validators";
import {
  getCategoriesController,
  getCategoryController,
  getCategoryTitlesController,
} from "../../data-access/controllers/user/category";

const categoryRouter = express.Router();

categoryRouter.get("/titles", makeExpressCallback(getCategoryTitlesController));

categoryRouter.get(
  "/:_id",
  makeValidator(getCategoryRules),
  makeExpressCallback(getCategoryController)
);

categoryRouter.get("/", makeExpressCallback(getCategoriesController));

export default categoryRouter;
