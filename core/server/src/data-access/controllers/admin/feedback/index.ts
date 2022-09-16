import {
  getFeedback,
  deleteFeedback,
  getFeedbacks,
  getFeedbackAnalystics,
} from "../../../../use-cases/feedback";
import { logger } from "../../../../config/logs/logger";

import makeGetFeedbackController from "./get-feedback";
import makeDeleteFeedbackController from "./delete-feedback";
import makeGetFeedbacksController from "./get-feedbacks";
import makeGetFeedbackAnalysticsController from "./get-feedback-analystics";

const getFeedbackAnalysticsController = makeGetFeedbackAnalysticsController({
  getFeedbackAnalystics,
});

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
  getFeedbackAnalysticsController,
});

export {
  getFeedbackController,
  deleteFeedbackController,
  getFeedbacksController,
  getFeedbackAnalysticsController,
};
