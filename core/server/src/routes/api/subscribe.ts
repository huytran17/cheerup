import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  createSubscribeRules,
  cancelSubscribeRules,
} from "../../data-access/controllers/user/subscribe/validators";
import {
  createSubscribeController,
  cancelSubscribeController,
} from "../../data-access/controllers/user/subscribe";

const subscribeRouter = express.Router();

subscribeRouter.put(
  "/:email",
  makeValidator(cancelSubscribeRules),
  makeExpressCallback(cancelSubscribeController)
); // DONE

subscribeRouter.post(
  "/",
  makeValidator(createSubscribeRules),
  makeExpressCallback(createSubscribeController)
); // DONE

export default subscribeRouter;
