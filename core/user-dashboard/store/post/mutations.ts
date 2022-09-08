import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { PostState } from ".";
import _ from "lodash";

const mutations: MutationTree<PostState> = {
  [MutationTypes.SET_POST_PAGINATION](state, { data }: { data: any }) {
    state.pagination = data;
  },

  [MutationTypes.SET_POST](state, { data }: { data: any }) {
    state.post = data;
  },

  [MutationTypes.SET_POSTS](state, { data }: { data: any[] }) {
    state.posts = data;
  },

  [MutationTypes.SET_LATEST_POSTS](state, { data }: { data: any[] }) {
    state.latest_posts = data;
  },
};

export default mutations;
