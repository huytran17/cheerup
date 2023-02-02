import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<CommentState, RootState> = {
  async [ActionTypes.GET_COMMENTS]({ commit }, params = {}) {
    const keep_in_store = _.get(params, "keep_in_store", true);

    const { data: comments } = await this.$axios.$get("/comment");

    if (!keep_in_store) {
      return comments;
    }

    commit(MutationTypes.SET_COMMENTS, { data: comments });

    return comments;
  },

  async [ActionTypes.GET_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: comment } = await this.$axios.$get(`/comment/${id}`);

    commit(MutationTypes.SET_COMMENT, { data: comment });

    return comment;
  },

  async [ActionTypes.CREATE_COMMENT]({ commit }, { data }: { data: any }) {
    const { data: comment } = await this.$axios.$post(`/comment`, data);

    return comment;
  },

  async [ActionTypes.UPDATE_COMMENT]({ commit }, { data }: { data: any }) {
    const { data: comment } = await this.$axios.$put(`/comment`, data);

    commit(MutationTypes.SET_COMMENT, { data: comment });

    return comment;
  },

  async [ActionTypes.HARD_DELETE_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: comment } = await this.$axios.$delete(
      `/comment/hard-delete/${id}`
    );

    commit(MutationTypes.SET_COMMENT, { data: comment });

    return comment;
  },

  async [ActionTypes.UPLOAD_COMMENT_THUMBNAIL](
    { commit },
    { file }: { file: any }
  ) {
    const form_data = new FormData();
    form_data.append("file", file);

    const { data: comment } = await this.$axios.$put(
      `/comment/upload-avatar`,
      form_data
    );

    return comment;
  },
};

export default actions;
