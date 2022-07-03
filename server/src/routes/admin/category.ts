import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getCategoryRules,
  deleteCategoryRules,
  updateCategoryRules,
  createCategoryRules,
} from "../../data-access/controllers/admin/category/validators";
import {
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
  getCategoriesController,
} from "../../data-access/controllers/admin/category";

const categoryRouter = express.Router();

categoryRouter.get(
  "/:_id",
  makeValidator(getCategoryRules),
  makeExpressCallback(getCategoryController)
); // DONE

categoryRouter.delete(
  "/:_id",
  makeValidator(deleteCategoryRules),
  makeExpressCallback(deleteCategoryController)
); // DONE

categoryRouter.put(
  "/:_id",
  makeValidator(updateCategoryRules),
  makeExpressCallback(updateCategoryController)
); // DONE

categoryRouter.post(
  "/",
  makeValidator(createCategoryRules),
  makeExpressCallback(createCategoryController)
); // DONE

categoryRouter.get("/", makeExpressCallback(getCategoriesController)); // DONE

export default categoryRouter;
