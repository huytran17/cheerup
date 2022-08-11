import { getSubscribe, getSubscribes } from "../../../../use-cases/subscribe";
import { logger } from "../../../../config/storage/logger";

import makeGetSubscribeController from "./get-subscribe";
import makeGetSubscribesController from "./get-subscribes";

const getSubscribesController = makeGetSubscribesController({
  getSubscribes,
  logger,
});

const getSubscribeController = makeGetSubscribeController({
  getSubscribe,
  logger,
});

export default Object.freeze({
  getSubscribeController,
  getSubscribesController,
});

export { getSubscribeController, getSubscribesController };
