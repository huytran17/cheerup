import { GetterTree } from "vuex";
import { FeedbackState } from ".";
import { RootState } from "..";

export const getters: GetterTree<FeedbackState, RootState> = {
  prefix() {
    return "/feedback";
  },
  feedback: (state) => state.feedback,
  feedbacks: (state) => state.feedbacks,
  feedback_analys_data: (state) => state.feedback_analys_data,
};

export default getters;
