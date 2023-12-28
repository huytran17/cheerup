import { logger } from "../../config/logs/logger";
import { redis } from "../../config/redis";

import { SubscriptionDb } from "../../data-access";
import makeCreateSubscription from "./create-subscription";
import makeGetActivatingSubscriptions from "./get-activating-subscriptions";
import makeGetSubscription from "./get-subscription";
import makeGetSubscriptionAnalystics from "./get-subscription-analystics";
import makeGetSubscriptionByEmail from "./get-subscription-by-email";
import makeGetSubscriptions from "./get-subscriptions";
import makeUpdateSubscription from "./update-subscription";

const getSubscriptionAnalystics = makeGetSubscriptionAnalystics({
  subscriptionDb: SubscriptionDb,
  redis,
  logger,
});

const getActivatingSubscriptions = makeGetActivatingSubscriptions({
  subscriptionDb: SubscriptionDb,
});

const getSubscription = makeGetSubscription({
  subscriptionDb: SubscriptionDb,
});

const getSubscriptionByEmail = makeGetSubscriptionByEmail({
  subscriptionDb: SubscriptionDb,
});

const updateSubscription = makeUpdateSubscription({
  subscriptionDb: SubscriptionDb,
});

const createSubscription = makeCreateSubscription({
  subscriptionDb: SubscriptionDb,
});

const getSubscriptions = makeGetSubscriptions({
  subscriptionDb: SubscriptionDb,
});

const subscriptionServices = Object.freeze({
  getSubscription,
  getSubscriptionByEmail,
  updateSubscription,
  getSubscriptions,
  createSubscription,
  getSubscriptionAnalystics,
  getActivatingSubscriptions,
});

export default subscriptionServices;

export {
  getSubscription,
  getSubscriptionByEmail,
  updateSubscription,
  getSubscriptions,
  createSubscription,
  getSubscriptionAnalystics,
  getActivatingSubscriptions,
};
