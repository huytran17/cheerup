import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getCategoryRules,
  deleteCategoryRules,
  updateCategoryRules,
  createCategoryRules,
  restoreCategoryRules,
  hardDeleteCategoryRules,
} from "../../data-access/controllers/admin/category/validators";
import {
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
  getCategoriesController,
  restoreCategoryController,
  hardDeleteCategoryController,
} from "../../data-access/controllers/admin/category";

const categoryRouter = express.Router();

categoryRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteCategoryRules),
  makeExpressCallback(hardDeleteCategoryController)
); // DONE

categoryRouter.put(
  "/restore/:_id",
  makeValidator(restoreCategoryRules),
  makeExpressCallback(restoreCategoryController)
); // DONE

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
