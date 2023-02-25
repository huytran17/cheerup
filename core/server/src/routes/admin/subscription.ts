import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getSubscriptionRules,
  getSubscriptionAnalysticsRules,
} from "../../data-access/controllers/admin/subscription/validators";
import {
  getSubscriptionController,
  getSubscriptionsController,
  getSubscriptionAnalysticsController,
} from "../../data-access/controllers/admin/subscription";

const subscriptionRouter = express.Router();

subscriptionRouter.get(
  "/analystics",
  makeValidator(getSubscriptionAnalysticsRules),
  makeExpressCallback(getSubscriptionAnalysticsController)
);

subscriptionRouter.get(
  "/:_id",
  makeValidator(getSubscriptionRules),
  makeExpressCallback(getSubscriptionController)
);

subscriptionRouter.get("/", makeExpressCallback(getSubscriptionsController));

export default subscriptionRouter;
