import {
  getSubscriptionByEmail,
  updateSubscription,
  createSubscription,
} from "../../../../use-cases/subscription";
import { logger } from "../../../../config/logs/logger";

import makeDeleteSubscriptionController from "./cancel-subscription";
import makeCreateSubscriptionController from "./create-subscription";

const createSubscriptionController = makeCreateSubscriptionController({
  createSubscription,
  getSubscriptionByEmail,
  logger,
});

const cancelSubscriptionController = makeDeleteSubscriptionController({
  getSubscriptionByEmail,
  updateSubscription,
  logger,
});

export default Object.freeze({
  cancelSubscriptionController,
  createSubscriptionController,
});

export { cancelSubscriptionController, createSubscriptionController };
