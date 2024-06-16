import { Router } from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";

import {
  createSubscriptionRules,
  cancelSubscriptionRules,
} from "../../data-access/controllers/user/subscription/validators";
import {
  createSubscriptionController,
  cancelSubscriptionController,
} from "../../data-access/controllers/user/subscription";

const subscriptionRouter = Router();

subscriptionRouter.put(
  "/",
  makeValidator(cancelSubscriptionRules),
  makeExpressCallback(cancelSubscriptionController)
);

subscriptionRouter.post(
  "/",
  makeValidator(createSubscriptionRules),
  makeExpressCallback(createSubscriptionController)
);

export default subscriptionRouter;
