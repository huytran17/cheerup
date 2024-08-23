import { get } from "lodash";
import { ActionTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<CommentState, RootState> = {
  async [ActionTypes.GET_COMMENTS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data } = await this.$axios.$get("/comment");

    if (!keep_in_store) {
      return data;
    }

    commit(MutationTypes.SET_COMMENTS, { data });
  },

  async [ActionTypes.HARD_DELETE_COMMENT]({ commit }, { id }: { id: string }) {
    const { data } = await this.$axios.$delete(`/comment/hard-delete/${id}`);
    commit(MutationTypes.SET_COMMENT, { data });
  },
};

export default actions;
