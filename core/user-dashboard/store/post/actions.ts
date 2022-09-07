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
};

export default actions;
