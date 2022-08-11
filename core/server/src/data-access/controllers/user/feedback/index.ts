import {
  getFeedback,
  deleteFeedback,
  updateFeedback,
  createFeedback,
  getFeedbacks,
} from "../../../../use-cases/feedback";
import { logger } from "../../../../config/storage/logger";

import makeGetFeedbackController from "./get-feedback";
import makeDeleteFeedbackController from "./delete-feedback";
import makeUpdateFeedbackController from "./update-feedback";
import makeCreateFeedbackController from "./create-feedback";
import makeGetFeedbacksController from "./get-feedbacks";

const getFeedbacksController = makeGetFeedbacksController({
  getFeedbacks,
  logger,
});

const createFeedbackController = makeCreateFeedbackController({
  createFeedback,
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

const updateFeedbackController = makeUpdateFeedbackController({
  getFeedback,
  updateFeedback,
  logger,
});

export default Object.freeze({
  getFeedbackController,
  deleteFeedbackController,
  updateFeedbackController,
  createFeedbackController,
  getFeedbacksController,
});

export {
  getFeedbackController,
  deleteFeedbackController,
  updateFeedbackController,
  createFeedbackController,
  getFeedbacksController,
};
