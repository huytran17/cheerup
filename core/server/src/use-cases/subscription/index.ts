import { logger } from "../../config/logs/logger";
import { SubscriptionDb } from "../../data-access";
import makeGetSubscription from "./get-subscription";
import makeGetSubscriptionByEmail from "./get-subscription-by-email";
import makeUpdateSubscription from "./update-subscription";
import makeCreateSubscription from "./create-subscription";
import makeGetSubscriptions from "./get-subscriptions";
import makeGetSubscriptionAnalystics from "./get-subscription-analystics";

const getSubscriptionAnalystics = makeGetSubscriptionAnalystics({
  subscriptionDb: SubscriptionDb,
});

const getSubscription = makeGetSubscription({
  subscriptionDb: SubscriptionDb,
  logger,
});

const getSubscriptionByEmail = makeGetSubscriptionByEmail({
  subscriptionDb: SubscriptionDb,
  logger,
});

const updateSubscription = makeUpdateSubscription({
  subscriptionDb: SubscriptionDb,
});

const createSubscription = makeCreateSubscription({
  subscriptionDb: SubscriptionDb,
});

const getSubscriptions = makeGetSubscriptions({
  subscriptionDb: SubscriptionDb,
  logger,
});

const subscriptionServices = Object.freeze({
  getSubscription,
  getSubscriptionByEmail,
  updateSubscription,
  getSubscriptions,
  createSubscription,
  getSubscriptionAnalystics,
});

export default subscriptionServices;

export {
  getSubscription,
  getSubscriptionByEmail,
  updateSubscription,
  getSubscriptions,
  createSubscription,
  getSubscriptionAnalystics,
};
