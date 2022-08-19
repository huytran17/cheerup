import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getAdminRules,
  updateAdminRules,
  deleteAdminRules,
  createAdminRules,
  disableAutoCensorshipRules,
  enableAutoCensorshipRules,
  restoreAdminRules,
  hardDeleteAdminRules
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
  hardDeleteAdminController
} from "../../data-access/controllers/admin/admin";

const adminRouter = express.Router();

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
); // DONE

adminRouter.get("/", makeExpressCallback(getAdminsController)); // DONE

export default adminRouter;
