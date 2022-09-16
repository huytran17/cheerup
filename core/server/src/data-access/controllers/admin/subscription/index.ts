import {
  getSubscription,
  getSubscriptions,
  getSubscriptionAnalystics,
} from "../../../../use-cases/subscription";
import { logger } from "../../../../config/logs/logger";

import makeGetSubscriptionController from "./get-subscription";
import makeGetSubscriptionsController from "./get-subscriptions";
import makeGetSubscriptionAnalysticsController from "./get-subscription-analystics";

const getSubscriptionAnalysticsController =
  makeGetSubscriptionAnalysticsController({
    getSubscriptionAnalystics,
  });

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
  getSubscriptionAnalysticsController,
});

export {
  getSubscriptionController,
  getSubscriptionsController,
  getSubscriptionAnalysticsController,
};
