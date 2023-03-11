import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import { AuthorizationRole } from "../../constants/authorization-role";

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
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(getSubscriptionRules),
  makeExpressCallback(getSubscriptionController)
);

subscriptionRouter.get(
  "/",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeExpressCallback(getSubscriptionsController)
);

export default subscriptionRouter;
