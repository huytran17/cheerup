import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import { upload } from "../../config/middlewares/file-upload-middleware";

import {
  getCategoryRules,
  deleteCategoryRules,
  updateCategoryRules,
  createCategoryRules,
  restoreCategoryRules,
  hardDeleteCategoryRules,
  uploadCategoryThumbnailRules,
  getCategoryAnalysticsRules,
} from "../../data-access/controllers/admin/category/validators";
import {
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
  getCategoriesController,
  restoreCategoryController,
  hardDeleteCategoryController,
  uploadCategoryThumbnailController,
  getCategoryAnalysticsController,
} from "../../data-access/controllers/admin/category";

const categoryRouter = express.Router();

categoryRouter.get(
  "/analystics",
  makeValidator(getCategoryAnalysticsRules),
  makeExpressCallback(getCategoryAnalysticsController)
);

categoryRouter.post(
  "/upload-thumbnail/:_id",
  upload.single("file"),
  makeValidator(uploadCategoryThumbnailRules),
  makeExpressCallback(uploadCategoryThumbnailController)
);

categoryRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteCategoryRules),
  makeExpressCallback(hardDeleteCategoryController)
);

categoryRouter.put(
  "/restore/:_id",
  makeValidator(restoreCategoryRules),
  makeExpressCallback(restoreCategoryController)
);

categoryRouter.get(
  "/:_id",
  makeValidator(getCategoryRules),
  makeExpressCallback(getCategoryController)
);

categoryRouter.delete(
  "/:_id",
  makeValidator(deleteCategoryRules),
  makeExpressCallback(deleteCategoryController)
);

categoryRouter.put(
  "/:_id",
  makeValidator(updateCategoryRules),
  makeExpressCallback(updateCategoryController)
);

categoryRouter.post(
  "/",
  makeValidator(createCategoryRules),
  makeExpressCallback(createCategoryController)
);

categoryRouter.get("/", makeExpressCallback(getCategoriesController));

export default categoryRouter;
