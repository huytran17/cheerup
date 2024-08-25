import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import makeValidator from "../../config/middlewares/validator";
import { AuthorizationRole } from "../../constants/authorization-role";
import {
  getSubscriptionAnalysticsController,
  getSubscriptionsController,
} from "../../data-access/controllers/admin/subscription";
import { getSubscriptionAnalysticsRules } from "../../data-access/controllers/admin/subscription/validators";

const subscriptionRouter = Router();

subscriptionRouter.get(
  "/analystics",
  makeValidator(getSubscriptionAnalysticsRules),
  makeExpressCallback(getSubscriptionAnalysticsController)
);

subscriptionRouter.get(
  "/",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeExpressCallback(getSubscriptionsController)
);

export default subscriptionRouter;
