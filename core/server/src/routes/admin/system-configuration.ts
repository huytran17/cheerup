import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import { AuthorizationRole } from "../../constants/authorization-role";

import {
  getSystemConfigurationRules,
  updateSystemConfigurationRules,
  uploadAdminMetaLogoRules,
  uploadAdminMetaFaviconRules,
  uploadClientMetaLogoRules,
  uploadClientMetaFaviconRules,
  uploadClientMetaOwnerAvatarRules,
  uploadAdminMetaFolderIconRules,
} from "../../data-access/controllers/admin/system-configuration/validators";
import {
  getSystemConfigurationController,
  updateSystemConfigurationController,
  getLatestSystemConfigurationController,
  uploadAdminMetaLogoController,
  uploadAdminMetaFaviconController,
  uploadClientMetaLogoController,
  uploadClientMetaFaviconController,
  uploadClientMetaOwnerAvatarController,
  uploadAdminMetaFolderIconController,
} from "../../data-access/controllers/admin/system-configuration";

const systemConfigurationRouter = express.Router();

systemConfigurationRouter.post(
  "/upload-admin-meta-folder-icon/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadAdminMetaFolderIconRules),
  makeExpressCallback(uploadAdminMetaFolderIconController)
);

systemConfigurationRouter.post(
  "/upload-client-meta-owner-avatar/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadClientMetaOwnerAvatarRules),
  makeExpressCallback(uploadClientMetaOwnerAvatarController)
);

systemConfigurationRouter.post(
  "/upload-admin-meta-logo/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadAdminMetaLogoRules),
  makeExpressCallback(uploadAdminMetaLogoController)
);

systemConfigurationRouter.post(
  "/upload-admin-meta-favicon/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadAdminMetaFaviconRules),
  makeExpressCallback(uploadAdminMetaFaviconController)
);

systemConfigurationRouter.post(
  "/upload-client-meta-logo/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadClientMetaLogoRules),
  makeExpressCallback(uploadClientMetaLogoController)
);

systemConfigurationRouter.post(
  "/upload-client-meta-favicon/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadClientMetaFaviconRules),
  makeExpressCallback(uploadClientMetaFaviconController)
);

systemConfigurationRouter.get(
  "/",
  makeExpressCallback(getLatestSystemConfigurationController)
);

systemConfigurationRouter.get(
  "/:_id",
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
