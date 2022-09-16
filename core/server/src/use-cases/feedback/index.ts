import { logger } from "../../config/logs/logger";

import { FeedbackDb } from "../../data-access";

import makeGetFeedback from "./get-feedback";
import makeDeleteFeedback from "./delete-feedback";
import makeUpdateFeedback from "./update-feedback";
import makeCreateFeedback from "./create-feedback";
import makeGetFeedbacks from "./get-feedbacks";
import makeGetFeedbackAnalystics from "./get-feedback-analystics";

const getFeedbackAnalystics = makeGetFeedbackAnalystics({
  feedbackDb: FeedbackDb,
});

const getFeedback = makeGetFeedback({
  feedbackDb: FeedbackDb,
  logger,
});

const deleteFeedback = makeDeleteFeedback({
  feedbackDb: FeedbackDb,
});

const updateFeedback = makeUpdateFeedback({
  feedbackDb: FeedbackDb,
});

const createFeedback = makeCreateFeedback({
  feedbackDb: FeedbackDb,
});

const getFeedbacks = makeGetFeedbacks({
  feedbackDb: FeedbackDb,
  logger,
});

const feedbackServices = Object.freeze({
  getFeedback,
  deleteFeedback,
  updateFeedback,
  getFeedbacks,
  createFeedback,
  getFeedbackAnalystics,
});

export default feedbackServices;

export {
  getFeedback,
  deleteFeedback,
  updateFeedback,
  getFeedbacks,
  createFeedback,
  getFeedbackAnalystics,
};
