import {
  getSubscriptionAnalystics,
  getSubscriptions,
} from "../../../../use-cases/subscription";
import makeGetSubscriptionAnalysticsController from "./get-subscription-analystics";
import makeGetSubscriptionsController from "./get-subscriptions";

const getSubscriptionAnalysticsController =
  makeGetSubscriptionAnalysticsController({
    getSubscriptionAnalystics,
  });

const getSubscriptionsController = makeGetSubscriptionsController({
  getSubscriptions,
});

export default Object.freeze({
  getSubscriptionsController,
  getSubscriptionAnalysticsController,
});

export { getSubscriptionAnalysticsController, getSubscriptionsController };
