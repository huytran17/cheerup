import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { FeedbackState } from ".";
import _ from "lodash";

const mutations: MutationTree<FeedbackState> = {
  [MutationTypes.SET_FEEDBACK](state, { data }: { data: any }) {
    state.feedback = data;
  },

  [MutationTypes.SET_FEEDBACKS](state, { data }: { data: any[] }) {
    state.feedbacks = data;
  },

  [MutationTypes.UPDATE_FEEDBACK_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.feedback = _.update(state.feedback, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
