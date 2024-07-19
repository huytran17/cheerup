import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";
import { get } from "lodash";

const actions: ActionTree<CommentState, RootState> = {
  async [ActionTypes.GET_COMMENTS_BY_PARENT](
    { commit },
    { parent_id, user_id }: { parent_id: string; user_id: string }
  ) {
    const api_route = user_id
      ? `/comment/by-parent/${parent_id}`
      : `/comment/by-parent-public/${parent_id}`;

    const { data: comments } = await this.$axios.$get(api_route);

    return comments;
  },

  async [ActionTypes.COUNT_COMMENT_BY_POST]({ commit }, params = {}) {
    const post_id = get(params, "post_id");

    const url_query = new URLSearchParams();

    post_id && url_query.set("post_id", post_id);

    const { data } = await this.$axios.$get(
      `/comment/count-by-post?${url_query}`
    );

    commit(MutationTypes.SET_COMMENT_COUNT_BY_POST, { data });

    return data;
  },

  async [ActionTypes.GET_COMMENTS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data: comments } = await this.$axios.$get("/comment");

    if (!keep_in_store) {
      return comments;
    }

    commit(MutationTypes.SET_COMMENTS, { data: comments });

    return comments;
  },

  async [ActionTypes.GET_COMMENT](
    { commit },
    { id, is_show_children = false }: { id: string; is_show_children: boolean }
  ) {
    const url_query = new URLSearchParams();

    is_show_children &&
      url_query.set("is_show_children", is_show_children.toString());

    const { data: comment } = await this.$axios.$get(
      `/comment/${id}?${url_query}`
    );

    commit(MutationTypes.SET_COMMENT, {
      data: { ...comment, is_shown_children: is_show_children },
    });

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

  async [ActionTypes.HARD_DELETE_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: comment } = await this.$axios.$delete(
      `/comment/hard-delete/${id}`
    );

    return comment;
  },

  async [ActionTypes.GET_COMMENTS_BY_POST_PAGINATED]({ commit }, params) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);
    const post_id = get(params, "post_id");
    const user_id = get(params, "user_id");
    const new_state = get(params, "new_state", true);
    const keep_in_store = get(params, "keep_in_store", true);

    const url_query = new URLSearchParams();

    query && url_query.set("query", query);

    page && url_query.set("page", page);

    entries_per_page && url_query.set("entries_per_page", entries_per_page);

    post_id && url_query.set("post_id", post_id);

    const api_route = user_id
      ? `/comment/by-post-paginated?${url_query}`
      : `/comment/by-post-paginated-public?${url_query}`;

    const { data, pagination } = await this.$axios.$get(api_route);

    if (!keep_in_store) {
      return { data, pagination };
    }

    commit(MutationTypes.SET_COMMENTS, { data, new_state });
    commit(MutationTypes.SET_COMMENT_PAGINATION, { data: pagination });

    return data;
  },
};

export default actions;
