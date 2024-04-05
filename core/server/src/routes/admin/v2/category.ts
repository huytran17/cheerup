import express from "express";
import makeValidator from "../../../config/middlewares/validator";
import makeExpressCallback from "../../../config/express-callback";
import makeAuthorization from "../../../config/middlewares/authorization";
import { AuthorizationRole } from "../../../constants/authorization-role";

import { uploadCategoryThumbnailRules } from "../../../data-access/controllers/admin/v2/category/validators";
import { uploadCategoryThumbnailController } from "../../../data-access/controllers/admin/v2/category";

const categoryRouter = express.Router();

categoryRouter.post(
  "/upload-thumbnail/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(uploadCategoryThumbnailRules),
  makeExpressCallback(uploadCategoryThumbnailController)
);

export default categoryRouter;
