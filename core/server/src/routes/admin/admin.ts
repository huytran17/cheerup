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
  disableAutoCensorshipRules,
  enableAutoCensorshipRules,
  restoreAdminRules,
  hardDeleteAdminRules,
  updateAdminPasswordRules,
  uploadAdminAvatarRules,
  updateAdminPersonalPasswordRules,
  getAdminAnalysticsRules,
} from "../../data-access/controllers/admin/admin/validators";
import {
  getAdminController,
  updateAdminController,
  getAdminsController,
  deleteAdminController,
  createAdminController,
  disableAutoCensorshipController,
  enableAutoCensorshipController,
  restoreAdminController,
  hardDeleteAdminController,
  updateAdminPasswordController,
  uploadAdminAvatarController,
  getAdminAnalysticsController,
  updateAdminPersonalPasswordController,
} from "../../data-access/controllers/admin/admin";

const adminRouter = express.Router();

adminRouter.get(
  "/analystics",
  makeValidator(getAdminAnalysticsRules),
  makeExpressCallback(getAdminAnalysticsController)
);

adminRouter.post(
  "/upload-avatar/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadAdminAvatarRules),
  makeExpressCallback(uploadAdminAvatarController)
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
  "/disable-auto-censorship/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(disableAutoCensorshipRules),
  makeExpressCallback(disableAutoCensorshipController)
);

adminRouter.put(
  "/restore/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(restoreAdminRules),
  makeExpressCallback(restoreAdminController)
);

adminRouter.put(
  "/enable-auto-censorship/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(enableAutoCensorshipRules),
  makeExpressCallback(enableAutoCensorshipController)
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
