import { getSubscription, getSubscriptions } from "../../../../use-cases/subscription";
import { logger } from "../../../../config/storage/logger";

import makeGetSubscriptionController from "./get-subscription";
import makeGetSubscriptionsController from "./get-subscriptions";

const getSubscriptionsController = makeGetSubscriptionsController({
  getSubscriptions,
  logger,
});

const getSubscriptionController = makeGetSubscriptionController({
  getSubscription,
  logger,
});

export default Object.freeze({
  getSubscriptionController,
  getSubscriptionsController,
});

export { getSubscriptionController, getSubscriptionsController };
