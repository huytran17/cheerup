import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import { AuthorizationRole } from "../../constants/authorization-role";

import {
  getSystemConfigurationRules,
  updateSystemConfigurationRules,
  uploadOwnerAvatarRules,
  uploadFolderIconRules,
  uploadThumbnailRules,
} from "../../data-access/controllers/admin/system-configuration/validators";
import {
  getSystemConfigurationController,
  updateSystemConfigurationController,
  getLatestSystemConfigurationController,
  uploadClientAvatarController,
  uploadFolderIconController,
  uploadThumbnaiilController,
} from "../../data-access/controllers/admin/system-configuration";

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

systemConfigurationRouter.get(
  "/",
  makeExpressCallback(getLatestSystemConfigurationController)
);

systemConfigurationRouter.get(
  "/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(getSystemConfigurationRules),
  makeExpressCallback(getSystemConfigurationController)
);

systemConfigurationRouter.put(
  "/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(updateSystemConfigurationRules),
  makeExpressCallback(updateSystemConfigurationController)
);

export default systemConfigurationRouter;
