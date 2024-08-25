import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import {
  cancelSubscriptionController,
  createSubscriptionController,
} from "../../data-access/controllers/user/subscription";
import {
  cancelSubscriptionRules,
  createSubscriptionRules,
} from "../../data-access/controllers/user/subscription/validators";

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
