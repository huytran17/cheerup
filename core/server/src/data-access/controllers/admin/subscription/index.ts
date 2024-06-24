import {
  getSubscription,
  getSubscriptionAnalystics,
  getSubscriptions,
} from "../../../../use-cases/subscription";
import makeGetSubscriptionController from "./get-subscription";
import makeGetSubscriptionAnalysticsController from "./get-subscription-analystics";
import makeGetSubscriptionsController from "./get-subscriptions";

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
  getSubscriptionAnalysticsController,
  getSubscriptionController,
  getSubscriptionsController,
};
