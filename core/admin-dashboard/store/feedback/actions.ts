import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { FeedbackState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<FeedbackState, RootState> = {
  async [ActionTypes.GET_FEEDBACK_ANALYTICS]({ commit }) {
    const { data } = await this.$axios.$get(`/feedback/analystics`);
    return data;
  },

  async [ActionTypes.GET_FEEDBACKS]({ commit }, params = {}) {
    const keep_in_store = _.get(params, "keep_in_store", true);

    const { data: feedbacks } = await this.$axios.$get("/feedback");

    if (!keep_in_store) {
      return feedbacks;
    }

    commit(MutationTypes.SET_FEEDBACKS, { data: feedbacks });

    return feedbacks;
  },

  async [ActionTypes.GET_FEEDBACK]({ commit }, { id }: { id: string }) {
    const { data: feedback } = await this.$axios.$get(`/feedback/${id}`);

    commit(MutationTypes.SET_FEEDBACK, { data: feedback });

    return feedback;
  },

  async [ActionTypes.CREATE_FEEDBACK]({ commit }, { data }: { data: any }) {
    const { data: feedback } = await this.$axios.$post(`/feedback`, data);

    return feedback;
  },

  async [ActionTypes.UPDATE_FEEDBACK]({ commit }, { data }: { data: any }) {
    const { data: feedback } = await this.$axios.$put(`/feedback`, data);

    commit(MutationTypes.SET_FEEDBACK, { data: feedback });

    return feedback;
  },

  async [ActionTypes.DELETE_FEEDBACK]({ commit }, { id }: { id: string }) {
    const { data: feedback } = await this.$axios.$delete(`/feedback/${id}`);

    commit(MutationTypes.SET_FEEDBACK, { data: feedback });

    return feedback;
  },

  async [ActionTypes.HARD_DELETE_FEEDBACK]({ commit }, { id }: { id: string }) {
    const { data: feedback } = await this.$axios.$delete(
      `/feedback/hard-delete/${id}`
    );

    commit(MutationTypes.SET_FEEDBACK, { data: feedback });

    return feedback;
  },

  async [ActionTypes.UPLOAD_FEEDBACK_THUMBNAIL](
    { commit },
    { file }: { file: any }
  ) {
    const form_data = new FormData();
    form_data.append("file", file);

    const { data: feedback } = await this.$axios.$put(
      `/feedback/upload-avatar`,
      form_data
    );

    return feedback;
  },
};

export default actions;
