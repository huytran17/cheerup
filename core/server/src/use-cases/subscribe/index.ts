import { logger } from "../../config/storage/logger";

import { SubscribeDb } from "../../data-access";

import makeGetSubscribe from "./get-subscribe";
import makeGetSubscribeByEmail from "./get-subscribe-by-email";
import makeUpdateSubscribe from "./update-subscribe";
import makeCreateSubscribe from "./create-subscribe";
import makeGetSubscribes from "./get-subscribes";

const getSubscribe = makeGetSubscribe({
  subscribeDb: SubscribeDb,
  logger,
});

const getSubscribeByEmail = makeGetSubscribeByEmail({
  subscribeDb: SubscribeDb,
  logger,
});

const updateSubscribe = makeUpdateSubscribe({
  subscribeDb: SubscribeDb,
});

const createSubscribe = makeCreateSubscribe({
  subscribeDb: SubscribeDb,
});

const getSubscribes = makeGetSubscribes({
  subscribeDb: SubscribeDb,
  logger,
});

const subscribeServices = Object.freeze({
  getSubscribe,
  getSubscribeByEmail,
  updateSubscribe,
  getSubscribes,
  createSubscribe,
});

export default subscribeServices;

export {
  getSubscribe,
  getSubscribeByEmail,
  updateSubscribe,
  getSubscribes,
  createSubscribe,
};
