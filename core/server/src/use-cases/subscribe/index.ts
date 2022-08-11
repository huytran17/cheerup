import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { SubscribeDb } from "../../data-access";

import makeGetSubscribe from "./get-subscribe";
import makeDeleteSubscribe from "./delete-subscribe";
import makeUpdateSubscribe from "./update-subscribe";
import makeCreateSubscribe from "./create-subscribe";
import makeGetSubscribes from "./get-subscribes";

const getSubscribe = makeGetSubscribe({
  subscribeDb: SubscribeDb,
  redis,
  logger,
});

const deleteSubscribe = makeDeleteSubscribe({
  subscribeDb: SubscribeDb,
});

const updateSubscribe = makeUpdateSubscribe({
  subscribeDb: SubscribeDb,
});

const createSubscribe = makeCreateSubscribe({
  subscribeDb: SubscribeDb,
});

const getSubscribes = makeGetSubscribes({
  subscribeDb: SubscribeDb,
  redis,
  logger,
});

const subscribeServices = Object.freeze({
  getSubscribe,
  deleteSubscribe,
  updateSubscribe,
  getSubscribes,
  createSubscribe,
});

export default subscribeServices;

export {
  getSubscribe,
  deleteSubscribe,
  updateSubscribe,
  getSubscribes,
  createSubscribe,
};
