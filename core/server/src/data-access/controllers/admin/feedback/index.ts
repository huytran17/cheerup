import {
  getFeedback,
  deleteFeedback,
  getFeedbacks,
} from "../../../../use-cases/feedback";
import { logger } from "../../../../config/storage/logger";

import makeGetFeedbackController from "./get-feedback";
import makeDeleteFeedbackController from "./delete-feedback";
import makeGetFeedbacksController from "./get-feedbacks";

const getFeedbacksController = makeGetFeedbacksController({
  getFeedbacks,
  logger,
});

const getFeedbackController = makeGetFeedbackController({
  getFeedback,
  logger,
});

const deleteFeedbackController = makeDeleteFeedbackController({
  getFeedback,
  deleteFeedback,
  logger,
});

export default Object.freeze({
  getFeedbackController,
  deleteFeedbackController,
  getFeedbacksController,
});

export {
  getFeedbackController,
  deleteFeedbackController,
  getFeedbacksController,
};
