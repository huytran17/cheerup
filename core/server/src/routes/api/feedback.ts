import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getFeedbackRules,
  deleteFeedbackRules,
  updateFeedbackRules,
  createFeedbackRules,
} from "../../data-access/controllers/user/feedback/validators";
import {
  getFeedbackController,
  deleteFeedbackController,
  updateFeedbackController,
  createFeedbackController,
  getFeedbacksController,
} from "../../data-access/controllers/user/feedback";

const feedbackRouter = express.Router();

feedbackRouter.get(
  "/:_id",
  makeValidator(getFeedbackRules),
  makeExpressCallback(getFeedbackController)
); // DONE

feedbackRouter.delete(
  "/:_id",
  makeValidator(deleteFeedbackRules),
  makeExpressCallback(deleteFeedbackController)
); // DONE

feedbackRouter.put(
  "/:_id",
  makeValidator(updateFeedbackRules),
  makeExpressCallback(updateFeedbackController)
); // DONE

feedbackRouter.post(
  "/",
  makeValidator(createFeedbackRules),
  makeExpressCallback(createFeedbackController)
); // DONE

feedbackRouter.get("/", makeExpressCallback(getFeedbacksController)); // DONE

export default feedbackRouter;
