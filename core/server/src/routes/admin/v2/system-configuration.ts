import express from "express";
import makeExpressCallback from "../../../config/express-callback";
import makeAuthorization from "../../../config/middlewares/authorization";
import makeValidator from "../../../config/middlewares/validator";
import { AuthorizationRole } from "../../../constants/authorization-role";
import {
  uploadClientAvatarController,
  uploadFolderIconController,
  uploadThumbnaiilController,
} from "../../../data-access/controllers/admin/v2/system-configuration";
import {
  uploadFolderIconRules,
  uploadOwnerAvatarRules,
  uploadThumbnailRules,
} from "../../../data-access/controllers/admin/v2/system-configuration/validators";

const systemConfigurationRouter = express.Router();

systemConfigurationRouter.post(
  "/upload-folder-icon/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadFolderIconRules),
  makeExpressCallback(uploadFolderIconController)
);

systemConfigurationRouter.post(
  "/upload-owner-avatar/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadOwnerAvatarRules),
  makeExpressCallback(uploadClientAvatarController)
);

systemConfigurationRouter.post(
  "/upload-thumbnail/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadThumbnailRules),
  makeExpressCallback(uploadThumbnaiilController)
);

systemConfigurationRouter.post(
  "/upload-excel-template/:type/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadThumbnailRules),
  makeExpressCallback(uploadThumbnaiilController)
);

export default systemConfigurationRouter;
