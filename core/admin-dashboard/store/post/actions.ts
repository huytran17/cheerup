import { get, join } from "lodash";
import { ActionTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<PostState, RootState> = {
  async [ActionTypes.GET_POST_ANALYTICS]({ commit }, params = {}) {
    const range = get(params, "range", []);
    const unit = get(params, "unit", "month");

    let url_query = new URLSearchParams();

    const has_range = range && range.length;

    has_range && url_query.set("range", join(range));

    unit && url_query.set("unit", unit);

    const { data } = await this.$axios.$get(`/post/analystics?${url_query}`);
    commit(MutationTypes.SET_POST_ANALYS_DATA, { data });
  },

  async [ActionTypes.GET_MOST_POPULAR_POSTS_ANALYTICS](
    { commit },
    params = {}
  ) {
    const range = get(params, "range", []);
    const unit = get(params, "unit", "month");
    const limit = get(params, "limit", 4);

    let url_query = new URLSearchParams();

    const has_range = range && range.length;

    has_range && url_query.set("range", join(range));

    unit && url_query.set("unit", unit);

    limit && url_query.set("limit", limit);

    const { data } = await this.$axios.$get(
      `/post/most-popular-posts-analystics?${url_query}`
    );

    commit(MutationTypes.SET_MOST_POPULAR_POSTS_ANALYS_DATA, { data });
  },

  async [ActionTypes.GET_POSTS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data } = await this.$axios.$get("/post");

    if (!keep_in_store) {
      return data;
    }

    commit(MutationTypes.SET_POSTS, { data });
  },

  async [ActionTypes.GET_POST]({ commit }, { id }: { id: string }) {
    const { data } = await this.$axios.$get(`/post/${id}`);
    commit(MutationTypes.SET_POST, { data });
  },

  async [ActionTypes.BLOCK_POST_COMMENT]({ commit }, { id }: { id: string }) {
    await this.$axios.$put(`/post/block-comment/${id}`);
  },

  async [ActionTypes.UNBLOCK_POST_COMMENT]({ commit }, { id }: { id: string }) {
    await this.$axios.$put(`/post/un-block-comment/${id}`);
  },

  async [ActionTypes.RESTORE_POST]({ commit }, { id }: { id: string }) {
    await this.$axios.$put(`/post/restore/${id}`);
  },

  async [ActionTypes.CREATE_POST]({ commit }, { data }: { data: any }) {
    const { data: post } = await this.$axios.$post(`/post`, data);
    return post;
  },

  async [ActionTypes.UPDATE_POST]({ commit }, { data }: { data: any }) {
    const { _id } = data;
    const { data: post } = await this.$axios.$put(`/post/${_id}`, data);

    commit(MutationTypes.SET_POST, { data: post });
  },

  async [ActionTypes.DELETE_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$delete(`/post/${id}`);
    commit(MutationTypes.SET_POST, { data: post });
  },

  async [ActionTypes.HARD_DELETE_POST]({ commit }, { id }: { id: string }) {
    await this.$axios.$delete(`/post/hard-delete/${id}`);
  },

  async [ActionTypes.GET_POSTS_PAGINATED]({ commit }, params = {}) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);

    const query_url = new URLSearchParams();

    query && query_url.set("query", query);
    page && query_url.set("page", page);
    entries_per_page && query_url.set("entries_per_page", entries_per_page);

    const { data, pagination } = await this.$axios.$get(
      `/post/all-paginated?${query_url}`
    );

    commit(MutationTypes.SET_POSTS, { data });
    commit(MutationTypes.SET_POST_PAGINATION, { data: pagination });
  },
};

export default actions;
