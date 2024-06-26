import { Router } from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import { AuthorizationRole } from "../../constants/authorization-role";

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

const categoryRouter = Router();

categoryRouter.get(
  "/analystics",
  makeValidator(getCategoryAnalysticsRules),
  makeExpressCallback(getCategoryAnalysticsController)
);

categoryRouter.post(
  "/upload-thumbnail/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(uploadCategoryThumbnailRules),
  makeExpressCallback(uploadCategoryThumbnailController)
);

categoryRouter.delete(
  "/hard-delete/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(hardDeleteCategoryRules),
  makeExpressCallback(hardDeleteCategoryController)
);

categoryRouter.put(
  "/restore/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(restoreCategoryRules),
  makeExpressCallback(restoreCategoryController)
);

categoryRouter.get(
  "/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(getCategoryRules),
  makeExpressCallback(getCategoryController)
);

categoryRouter.delete(
  "/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(deleteCategoryRules),
  makeExpressCallback(deleteCategoryController)
);

categoryRouter.put(
  "/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(updateCategoryRules),
  makeExpressCallback(updateCategoryController)
);

categoryRouter.post(
  "/",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(createCategoryRules),
  makeExpressCallback(createCategoryController)
);

categoryRouter.get("/", makeExpressCallback(getCategoriesController));

export default categoryRouter;
