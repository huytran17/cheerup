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
} from "../../data-access/controllers/admin/admin/validators";
import {
  getAdminController,
  updateAdminController,
  getAdminsController,
  deleteAdminController,
  createAdminController,
  disableAutoCensorshipController,
  enableAutoCensorshipController,
} from "../../data-access/controllers/admin/admin";

const adminRouter = express.Router();

adminRouter.put(
  "/disable-auto-censorship/:_id",
  makeValidator(disableAutoCensorshipRules),
  makeExpressCallback(disableAutoCensorshipController)
);

adminRouter.put(
  "/enable-auto-censorship/:_id",
  makeValidator(enableAutoCensorshipRules),
  makeExpressCallback(enableAutoCensorshipController)
);

adminRouter.delete(
  "/delete/:_id",
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
