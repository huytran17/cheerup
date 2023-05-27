import express from "express";
import makeExpressCallback from "../../config/express-callback";
import { getLatestSystemConfigurationController } from "../../data-access/controllers/user/system-configuration";

const systemConfigurationRouter = express.Router();

systemConfigurationRouter.get(
  "/",
  makeExpressCallback(getLatestSystemConfigurationController)
);

export default systemConfigurationRouter;
