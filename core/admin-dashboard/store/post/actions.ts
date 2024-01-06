import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";
import { get, join } from "lodash";

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
    return data;
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
    return data;
  },

  async [ActionTypes.GET_POSTS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data: posts } = await this.$axios.$get("/post");

    if (!keep_in_store) {
      return posts;
    }

    commit(MutationTypes.SET_POSTS, { data: posts });

    return posts;
  },

  async [ActionTypes.GET_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$get(`/post/${id}`);

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },

  async [ActionTypes.BLOCK_POST_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$put(`/post/block-comment/${id}`);
    return post;
  },

  async [ActionTypes.UNBLOCK_POST_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$put(
      `/post/un-block-comment/${id}`
    );
    return post;
  },

  async [ActionTypes.RESTORE_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$put(`/post/restore/${id}`);
    return post;
  },

  async [ActionTypes.CREATE_POST]({ commit }, { data }: { data: any }) {
    const { data: post } = await this.$axios.$post(`/post`, data);
    return post;
  },

  async [ActionTypes.UPDATE_POST]({ commit }, { data }: { data: any }) {
    const { _id } = data;
    const { data: post } = await this.$axios.$put(`/post/${_id}`, data);

    commit(MutationTypes.SET_POST, { data: post });
    return post;
  },

  async [ActionTypes.DELETE_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$delete(`/post/${id}`);

    commit(MutationTypes.SET_POST, { data: post });
    return post;
  },

  async [ActionTypes.HARD_DELETE_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$delete(`/post/hard-delete/${id}`);
    return post;
  },
};

export default actions;
