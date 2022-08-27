import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { FeedbackState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<FeedbackState, RootState> = {
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
};

export default actions;
