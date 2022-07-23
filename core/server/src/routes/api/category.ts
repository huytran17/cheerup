import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import { getCategoryRules } from "../../data-access/controllers/user/category/validators";
import {
  getCategoriesController,
  getCategoryController,
} from "../../data-access/controllers/user/category";

const categoryRouter = express.Router();

categoryRouter.get(
  "/:category_id",
  makeValidator(getCategoryRules),
  makeExpressCallback(getCategoryController)
); // DONE

categoryRouter.get("/", makeExpressCallback(getCategoriesController)); // DONE

export default categoryRouter;
