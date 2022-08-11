import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { FeedbackDb } from "../../data-access";

import makeGetFeedback from "./get-feedback";
import makeDeleteFeedback from "./delete-feedback";
import makeUpdateFeedback from "./update-feedback";
import makeCreateFeedback from "./create-feedback";
import makeGetFeedbacks from "./get-feedbacks";

const getFeedback = makeGetFeedback({
  feedbackDb: FeedbackDb,
  redis,
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
  redis,
  logger,
});

const feedbackServices = Object.freeze({
  getFeedback,
  deleteFeedback,
  updateFeedback,
  getFeedbacks,
  createFeedback,
});

export default feedbackServices;

export {
  getFeedback,
  deleteFeedback,
  updateFeedback,
  getFeedbacks,
  createFeedback,
};
