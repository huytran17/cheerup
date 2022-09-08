import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<PostState, RootState> = {
  async [ActionTypes.GET_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$get(`/post/${id}`);

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },

  async [ActionTypes.GET_LATEST_POSTS]({ commit }, params = {}) {
    const amount = _.get(params, "amount", 5);

    const url_query = new URLSearchParams();

    if (amount) {
      url_query.set("amount", amount);
    }

    const { data: posts } = await this.$axios.$get(
      `/post/latest-posts?${url_query}`
    );

    commit(MutationTypes.SET_LATEST_POSTS, { data: posts });

    return posts;
  },

  async [ActionTypes.GET_POSTS]({ commit }) {
    const { data: posts } = await this.$axios.$get(`/`);

    commit(MutationTypes.SET_POSTS, { data: posts });

    return posts;
  },

  async [ActionTypes.GET_POSTS_PAGINATED]({ commit }, params = {}) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);
    const entries_per_page = _.get(params, "entries_per_page", 15);
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

    const { data: posts, pagination } = await this.$axios.$get(
      `/post/all-paginated?${url_query}`
    );

    commit(MutationTypes.SET_POSTS, { data: posts, new_state });
    commit(MutationTypes.SET_POST_PAGINATION, { data: pagination });

    return posts;
  },
};

export default actions;
