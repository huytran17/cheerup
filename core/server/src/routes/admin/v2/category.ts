import { Router } from "express";
import makeExpressCallback from "../../../config/express-callback";
import makeAuthorization from "../../../config/middlewares/authorization";
import makeValidator from "../../../config/middlewares/validator";
import { AuthorizationRole } from "../../../constants/authorization-role";
import { uploadCategoryThumbnailController } from "../../../data-access/controllers/admin/v2/category";
import { uploadCategoryThumbnailRules } from "../../../data-access/controllers/admin/v2/category/validators";

const categoryRouter = Router();

categoryRouter.post(
  "/upload-thumbnail/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(uploadCategoryThumbnailRules),
  makeExpressCallback(uploadCategoryThumbnailController)
);

export default categoryRouter;
