import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  createSubscriptionRules,
  cancelSubscriptionRules,
} from "../../data-access/controllers/user/subscription/validators";
import {
  createSubscriptionController,
  cancelSubscriptionController,
} from "../../data-access/controllers/user/subscription";

const subscriptionRouter = express.Router();

subscriptionRouter.put(
  "/:email",
  makeValidator(cancelSubscriptionRules),
  makeExpressCallback(cancelSubscriptionController)
); // DONE

subscriptionRouter.post(
  "/",
  makeValidator(createSubscriptionRules),
  makeExpressCallback(createSubscriptionController)
); // DONE

export default subscriptionRouter;