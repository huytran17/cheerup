import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import makeValidator from "../../config/middlewares/validator";
import { AuthorizationRole } from "../../constants/authorization-role";
import {
  createAdminController,
  deleteAdminController,
  getAdminAnalysticsController,
  getAdminController,
  getAdminsController,
  getAdminsPaginatedController,
  hardDeleteAdminController,
  resetAdminLoginFailedTimesController,
  restoreAdminController,
  updateAdminController,
  updateAdminPasswordController,
  updateAdminPersonalPasswordController,
  uploadAvatarController,
} from "../../data-access/controllers/admin/admin";
import {
  createAdminRules,
  deleteAdminRules,
  getAdminAnalysticsRules,
  getAdminRules,
  getAdminsPaginatedRules,
  hardDeleteAdminRules,
  resetAdminLoginFailedTimesRules,
  restoreAdminRules,
  updateAdminPasswordRules,
  updateAdminPersonalPasswordRules,
  updateAdminRules,
  uploadAvatarRules,
} from "../../data-access/controllers/admin/admin/validators";

const adminRouter = Router();

adminRouter.get(
  "/all-paginated",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(getAdminsPaginatedRules),
  makeExpressCallback(getAdminsPaginatedController)
);

adminRouter.put(
  "/reset-admin-login-failed-times/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
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
