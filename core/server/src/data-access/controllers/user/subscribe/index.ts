import {
  getSubscribeByEmail,
  updateSubscribe,
  createSubscribe,
} from "../../../../use-cases/subscribe";
import { logger } from "../../../../config/storage/logger";

import makeDeleteSubscribeController from "./cancel-subscribe";
import makeCreateSubscribeController from "./create-subscribe";

const createSubscribeController = makeCreateSubscribeController({
  createSubscribe,
  getSubscribeByEmail,
  logger,
});

const cancelSubscribeController = makeDeleteSubscribeController({
  getSubscribeByEmail,
  updateSubscribe,
  logger,
});

export default Object.freeze({
  cancelSubscribeController,
  createSubscribeController,
});

export { cancelSubscribeController, createSubscribeController };
