import {
  getSubscribe,
  deleteSubscribe,
  updateSubscribe,
  createSubscribe,
  getSubscribes,
} from "../../../../use-cases/subscribe";
import { logger } from "../../../../config/storage/logger";

import makeGetSubscribeController from "./get-subscribe";
import makeDeleteSubscribeController from "./delete-subscribe";
import makeUpdateSubscribeController from "./update-subscribe";
import makeCreateSubscribeController from "./create-subscribe";
import makeGetSubscribesController from "./get-subscribes";

const getSubscribesController = makeGetSubscribesController({
  getSubscribes,
  logger,
});

const createSubscribeController = makeCreateSubscribeController({
  createSubscribe,
  logger,
});

const getSubscribeController = makeGetSubscribeController({
  getSubscribe,
  logger,
});

const deleteSubscribeController = makeDeleteSubscribeController({
  getSubscribe,
  deleteSubscribe,
  logger,
});

const updateSubscribeController = makeUpdateSubscribeController({
  getSubscribe,
  updateSubscribe,
  logger,
});

export default Object.freeze({
  getSubscribeController,
  deleteSubscribeController,
  updateSubscribeController,
  createSubscribeController,
  getSubscribesController,
});

export {
  getSubscribeController,
  deleteSubscribeController,
  updateSubscribeController,
  createSubscribeController,
  getSubscribesController,
};
