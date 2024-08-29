import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import makeValidator from "../../config/middlewares/validator";
import { AuthorizationRole } from "../../constants/authorization-role";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoriesPaginatedController,
  getCategoryAnalysticsController,
  getCategoryController,
  hardDeleteCategoryController,
  restoreCategoryController,
  updateCategoryController,
  uploadCategoryThumbnailController,
} from "../../data-access/controllers/admin/category";
import {
  createCategoryRules,
  deleteCategoryRules,
  getCategoriesPaginatedRules,
  getCategoryAnalysticsRules,
  getCategoryRules,
  hardDeleteCategoryRules,
  restoreCategoryRules,
  updateCategoryRules,
  uploadCategoryThumbnailRules,
} from "../../data-access/controllers/admin/category/validators";

const categoryRouter = Router();

categoryRouter.get(
  "/all-paginated",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(getCategoriesPaginatedRules),
  makeExpressCallback(getCategoriesPaginatedController)
);

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
