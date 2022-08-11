import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import { deleteFeedbackRules } from "../../data-access/controllers/admin/feedback/validators";
import {
  deleteFeedbackController,
  getFeedbacksController,
} from "../../data-access/controllers/admin/feedback";

const feedbackRouter = express.Router();

feedbackRouter.delete(
  "/:_id",
  makeValidator(deleteFeedbackRules),
  makeExpressCallback(deleteFeedbackController)
); // DONE

feedbackRouter.get("/", makeExpressCallback(getFeedbacksController)); // DONE

export default feedbackRouter;
