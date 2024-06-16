import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import { getLatestSystemConfigurationController } from "../../data-access/controllers/user/system-configuration";

const systemConfigurationRouter = Router();

systemConfigurationRouter.get(
  "/",
  makeExpressCallback(getLatestSystemConfigurationController)
);

export default systemConfigurationRouter;
