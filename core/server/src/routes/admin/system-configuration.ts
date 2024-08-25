import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import makeValidator from "../../config/middlewares/validator";
import { AuthorizationRole } from "../../constants/authorization-role";
import {
  getLatestSystemConfigurationController,
  updateSystemConfigurationController,
  uploadClientAvatarController,
  uploadFolderIconController,
  uploadThumbnaiilController,
} from "../../data-access/controllers/admin/system-configuration";
import {
  updateSystemConfigurationRules,
  uploadFolderIconRules,
  uploadOwnerAvatarRules,
  uploadThumbnailRules,
} from "../../data-access/controllers/admin/system-configuration/validators";

const systemConfigurationRouter = Router();

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

systemConfigurationRouter.put(
  "/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(updateSystemConfigurationRules),
  makeExpressCallback(updateSystemConfigurationController)
);

export default systemConfigurationRouter;
