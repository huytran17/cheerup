import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getSystemConfigurationRules,
  updateSystemConfigurationRules,
} from "../../data-access/controllers/admin/system-configuration/validators";
import {
  getSystemConfigurationController,
  updateSystemConfigurationController,
} from "../../data-access/controllers/admin/system-configuration";

const systemConfigurationRouter = express.Router();

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
