import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import { upload } from "../../config/middlewares/file-upload-middleware";

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
  upload.single("file"),
  makeValidator(uploadAdminMetaFolderIconRules),
  makeExpressCallback(uploadAdminMetaFolderIconController)
);

systemConfigurationRouter.post(
  "/upload-client-meta-owner-avatar/:_id",
  upload.single("file"),
  makeValidator(uploadClientMetaOwnerAvatarRules),
  makeExpressCallback(uploadClientMetaOwnerAvatarController)
);

systemConfigurationRouter.post(
  "/upload-admin-meta-logo/:_id",
  upload.single("file"),
  makeValidator(uploadAdminMetaLogoRules),
  makeExpressCallback(uploadAdminMetaLogoController)
);

systemConfigurationRouter.post(
  "/upload-admin-meta-favicon/:_id",
  upload.single("file"),
  makeValidator(uploadAdminMetaFaviconRules),
  makeExpressCallback(uploadAdminMetaFaviconController)
);

systemConfigurationRouter.post(
  "/upload-client-meta-logo/:_id",
  upload.single("file"),
  makeValidator(uploadClientMetaLogoRules),
  makeExpressCallback(uploadClientMetaLogoController)
);

systemConfigurationRouter.post(
  "/upload-client-meta-favicon/:_id",
  upload.single("file"),
  makeValidator(uploadClientMetaFaviconRules),
  makeExpressCallback(uploadClientMetaFaviconController)
);

systemConfigurationRouter.get(
  "/",
  makeExpressCallback(getLatestSystemConfigurationController)
); // DONE

systemConfigurationRouter.get(
  "/:_id",
  makeValidator(getSystemConfigurationRules),
  makeExpressCallback(getSystemConfigurationController)
); // DONE

systemConfigurationRouter.put(
  "/:_id",
  makeValidator(updateSystemConfigurationRules),
  makeExpressCallback(updateSystemConfigurationController)
); // DONE

export default systemConfigurationRouter;
