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

  async [ActionTypes.LIKE_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: comment } = await this.$axios.$put(`/comment/like/${id}`);

    commit(MutationTypes.SET_COMMENT, { data: comment });

    return comment;
  },

  async [ActionTypes.DISLIKE_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: comment } = await this.$axios.$put(`/comment/dislike/${id}`);

    commit(MutationTypes.SET_COMMENT, { data: comment });

    return comment;
  },

  async [ActionTypes.CREATE_COMMENT]({ commit }, { data }: { data: any }) {
    const { data: comment } = await this.$axios.$post(`/comment`, data);

    return comment;
  },

  async [ActionTypes.REPLY_COMMENT]({ commit }, { data }: { data: any }) {
    const { data: comment } = await this.$axios.$post(`/comment/reply`, data);

    return comment;
  },

  async [ActionTypes.UPDATE_COMMENT]({ commit }, { data }: { data: any }) {
    const { _id } = data;
    const { data: comment } = await this.$axios.$put(`/comment/${_id}`, data);

    commit(MutationTypes.SET_COMMENT, { data: comment });

    return comment;
  },

  async [ActionTypes.DELETE_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: comment } = await this.$axios.$delete(`/comment/${id}`);

    return comment;
  },

  async [ActionTypes.HARD_DELETE_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: comment } = await this.$axios.$delete(
      `/comment/hard-delete/${id}`
    );

    return comment;
  },

  async [ActionTypes.GET_COMMENTS_BY_POST_PAGINATED]({ commit }, params) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);
    const entries_per_page = _.get(params, "entries_per_page", 15);
    const post_id = _.get(params, "post_id");
    const new_state = _.get(params, "new_state", true);

    const url_query = new URLSearchParams();

    if (query) {
      url_query.set("query", query);
    }

    if (page) {
      url_query.set("page", page);
    }

    if (entries_per_page) {
      url_query.set("entries_per_page", entries_per_page);
    }

    if (post_id) {
      url_query.set("post_id", post_id);
    }

    const { data: comments, pagination } = await this.$axios.$get(
      `/comment/by-post-paginated?${url_query}`
    );

    commit(MutationTypes.SET_COMMENTS, { data: comments, new_state });
    commit(MutationTypes.SET_COMMENT_PAGINATION, { data: pagination });

    return comments;
  },
};

export default actions;
