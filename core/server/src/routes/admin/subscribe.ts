import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import { getSubscribeRules } from "../../data-access/controllers/admin/subscribe/validators";
import {
  getSubscribeController,
  getSubscribesController,
} from "../../data-access/controllers/admin/subscribe";

const subscribeRouter = express.Router();

subscribeRouter.get(
  "/:_id",
  makeValidator(getSubscribeRules),
  makeExpressCallback(getSubscribeController)
); // DONE

subscribeRouter.get("/", makeExpressCallback(getSubscribesController)); // DONE

export default subscribeRouter;
