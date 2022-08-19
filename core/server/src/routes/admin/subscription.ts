import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import { getSubscriptionRules } from "../../data-access/controllers/admin/subscription/validators";
import {
  getSubscriptionController,
  getSubscriptionsController,
} from "../../data-access/controllers/admin/subscription";

const subscriptionRouter = express.Router();

subscriptionRouter.get(
  "/:_id",
  makeValidator(getSubscriptionRules),
  makeExpressCallback(getSubscriptionController)
); // DONE

subscriptionRouter.get("/", makeExpressCallback(getSubscriptionsController)); // DONE

export default subscriptionRouter;
