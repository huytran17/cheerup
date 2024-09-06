import {
  getSubscriptionAnalystics,
  getSubscriptions,
  getSubscriptionsPaginated,
} from "../../../../use-cases/subscription";
import makeGetSubscriptionAnalysticsController from "./get-subscription-analystics";
import makeGetSubscriptionsController from "./get-subscriptions";
import makeGetSubscriptionsPaginatedController from "./get-subscriptions-paginated";

const getSubscriptionsPaginatedController =
  makeGetSubscriptionsPaginatedController({
    getSubscriptionsPaginated,
  });

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
  getSubscriptionsPaginatedController,
});

export {
  getSubscriptionAnalysticsController,
  getSubscriptionsController,
  getSubscriptionsPaginatedController,
};
