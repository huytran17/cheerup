import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import { AuthorizationRole } from "../../constants/authorization-role";

import {
  getAdminRules,
  updateAdminRules,
  deleteAdminRules,
  createAdminRules,
  restoreAdminRules,
  hardDeleteAdminRules,
  updateAdminPasswordRules,
  uploadAvatarRules,
  updateAdminPersonalPasswordRules,
  getAdminAnalysticsRules,
  resetAdminLoginFailedTimesRules,
} from "../../data-access/controllers/admin/admin/validators";
import {
  getAdminController,
  updateAdminController,
  getAdminsController,
  deleteAdminController,
  createAdminController,
  restoreAdminController,
  hardDeleteAdminController,
  updateAdminPasswordController,
  uploadAvatarController,
  getAdminAnalysticsController,
  updateAdminPersonalPasswordController,
  resetAdminLoginFailedTimesController,
} from "../../data-access/controllers/admin/admin";

const adminRouter = express.Router();

adminRouter.put(
  "/reset-admin-login-failed-times/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(resetAdminLoginFailedTimesRules),
  makeExpressCallback(resetAdminLoginFailedTimesController)
);

adminRouter.get(
  "/analystics",
  makeValidator(getAdminAnalysticsRules),
  makeExpressCallback(getAdminAnalysticsController)
);

adminRouter.post(
  "/upload-avatar/:_id",
  makeValidator(uploadAvatarRules),
  makeExpressCallback(uploadAvatarController)
);

adminRouter.put(
  "/password",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(updateAdminPasswordRules),
  makeExpressCallback(updateAdminPasswordController)
);

adminRouter.put(
  "/personal-password",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(updateAdminPersonalPasswordRules),
  makeExpressCallback(updateAdminPersonalPasswordController)
);

adminRouter.delete(
  "/hard-delete/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(hardDeleteAdminRules),
  makeExpressCallback(hardDeleteAdminController)
);

adminRouter.put(
  "/restore/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(restoreAdminRules),
  makeExpressCallback(restoreAdminController)
);

adminRouter.delete(
  "/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(deleteAdminRules),
  makeExpressCallback(deleteAdminController)
);

adminRouter.get(
  "/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(getAdminRules),
  makeExpressCallback(getAdminController)
);

adminRouter.post(
  "/",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(createAdminRules),
  makeExpressCallback(createAdminController)
);

adminRouter.put(
  "/",
  makeValidator(updateAdminRules),
  makeExpressCallback(updateAdminController)
);

adminRouter.get(
  "/",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeExpressCallback(getAdminsController)
);

export default adminRouter;
