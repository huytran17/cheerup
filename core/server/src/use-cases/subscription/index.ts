import { logger } from "../../config/logs/logger";
import { randomCacheTime } from "../../config/random-cache-time";
import { redis } from "../../config/redis";
import { SubscriptionDb } from "../../data-access";
import makeCreateSubscription from "./create-subscription";
import makeGetActivatingSubscriptions from "./get-activating-subscriptions";
import makeGetSubscription from "./get-subscription";
import makeGetSubscriptionAnalystics from "./get-subscription-analystics";
import makeGetSubscriptionByEmail from "./get-subscription-by-email";
import makeGetSubscriptions from "./get-subscriptions";
import makeGetSubscriptionsPaginated from "./get-subscriptions-paginated";
import makeUpdateSubscription from "./update-subscription";

const getSubscriptionsPaginated = makeGetSubscriptionsPaginated({
  subscriptionDb: SubscriptionDb,
  randomCacheTime,
  redis,
  logger,
});

const getSubscriptionAnalystics = makeGetSubscriptionAnalystics({
  subscriptionDb: SubscriptionDb,
  randomCacheTime,
  redis,
  logger,
});

const getActivatingSubscriptions = makeGetActivatingSubscriptions({
  subscriptionDb: SubscriptionDb,
  randomCacheTime,
  redis,
  logger,
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
  randomCacheTime,
  redis,
  logger,
});

const subscriptionServices = Object.freeze({
  getSubscription,
  getSubscriptionByEmail,
  updateSubscription,
  getSubscriptions,
  createSubscription,
  getSubscriptionAnalystics,
  getActivatingSubscriptions,
  getSubscriptionsPaginated,
});

export default subscriptionServices;

export {
  createSubscription,
  getActivatingSubscriptions,
  getSubscription,
  getSubscriptionAnalystics,
  getSubscriptionByEmail,
  getSubscriptions,
  getSubscriptionsPaginated,
  updateSubscription,
};
