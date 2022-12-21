import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import { upload } from "../../config/middlewares/file-upload-middleware";

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
  makeExpressCallback(getAdminAnalysticsController)
);

adminRouter.post(
  "/upload-avatar/:_id",
  upload.single("file"),
  makeValidator(uploadAdminAvatarRules),
  makeExpressCallback(uploadAdminAvatarController)
);

adminRouter.put(
  "/password",
  makeValidator(updateAdminPasswordRules),
  makeExpressCallback(updateAdminPasswordController)
);

adminRouter.put(
  "/personal-password",
  makeValidator(updateAdminPersonalPasswordRules),
  makeExpressCallback(updateAdminPersonalPasswordController)
);

adminRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteAdminRules),
  makeExpressCallback(hardDeleteAdminController)
);

adminRouter.put(
  "/disable-auto-censorship/:_id",
  makeValidator(disableAutoCensorshipRules),
  makeExpressCallback(disableAutoCensorshipController)
);

adminRouter.put(
  "/restore/:_id",
  makeValidator(restoreAdminRules),
  makeExpressCallback(restoreAdminController)
);

adminRouter.put(
  "/enable-auto-censorship/:_id",
  makeValidator(enableAutoCensorshipRules),
  makeExpressCallback(enableAutoCensorshipController)
);

adminRouter.delete(
  "/:_id",
  makeValidator(deleteAdminRules),
  makeExpressCallback(deleteAdminController)
);

adminRouter.get(
  "/:_id",
  makeValidator(getAdminRules),
  makeExpressCallback(getAdminController)
);

adminRouter.post(
  "/",
  makeValidator(createAdminRules),
  makeExpressCallback(createAdminController)
);

adminRouter.put(
  "/",
  makeValidator(updateAdminRules),
  makeExpressCallback(updateAdminController)
);

adminRouter.get("/", makeExpressCallback(getAdminsController));

export default adminRouter;
