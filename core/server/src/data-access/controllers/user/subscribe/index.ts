import {
  getSubscribe,
  getSubscribeByEmail,
  updateSubscribe,
  createSubscribe,
  getSubscribes,
} from "../../../../use-cases/subscribe";
import { logger } from "../../../../config/storage/logger";

import makeDeleteSubscribeController from "./cancel-subscribe";
import makeCreateSubscribeController from "./create-subscribe";

const createSubscribeController = makeCreateSubscribeController({
  createSubscribe,
  getSubscribeByEmail,
  logger,
});

const deleteSubscribeController = makeDeleteSubscribeController({
  getSubscribeByEmail,
  updateSubscribe,
  logger,
});

export default Object.freeze({
  deleteSubscribeController,
  createSubscribeController,
});

export { deleteSubscribeController, createSubscribeController };
