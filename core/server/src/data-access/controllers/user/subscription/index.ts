import {
  createSubscription,
  getSubscriptionByEmail,
  updateSubscription,
} from "../../../../use-cases/subscription";
import makeCancelSubscriptionController from "./cancel-subscription";
import makeCreateSubscriptionController from "./create-subscription";

const createSubscriptionController = makeCreateSubscriptionController({
  createSubscription,
  getSubscriptionByEmail,
  updateSubscription,
});

const cancelSubscriptionController = makeCancelSubscriptionController({
  getSubscriptionByEmail,
  updateSubscription,
});

export default Object.freeze({
  cancelSubscriptionController,
  createSubscriptionController,
});

export { cancelSubscriptionController, createSubscriptionController };
