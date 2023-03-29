import {
  getSubscription,
  getSubscriptions,
  getSubscriptionAnalystics,
} from "../../../../use-cases/subscription";

import makeGetSubscriptionController from "./get-subscription";
import makeGetSubscriptionsController from "./get-subscriptions";
import makeGetSubscriptionAnalysticsController from "./get-subscription-analystics";

const getSubscriptionAnalysticsController =
  makeGetSubscriptionAnalysticsController({
    getSubscriptionAnalystics,
  });

const getSubscriptionsController = makeGetSubscriptionsController({
  getSubscriptions,
});

const getSubscriptionController = makeGetSubscriptionController({
  getSubscription,
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
