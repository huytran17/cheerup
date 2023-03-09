import {
  getSubscriptionByEmail,
  updateSubscription,
  createSubscription,
} from "../../../../use-cases/subscription";
import { logger } from "../../../../config/logs/logger";

import makeCancelSubscriptionController from "./cancel-subscription";
import makeCreateSubscriptionController from "./create-subscription";

const createSubscriptionController = makeCreateSubscriptionController({
  createSubscription,
  getSubscriptionByEmail,
  updateSubscription,
  logger,
});

const cancelSubscriptionController = makeCancelSubscriptionController({
  getSubscriptionByEmail,
  updateSubscription,
  logger,
});

export default Object.freeze({
  cancelSubscriptionController,
  createSubscriptionController,
});

export { cancelSubscriptionController, createSubscriptionController };
