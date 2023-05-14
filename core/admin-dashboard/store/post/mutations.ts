import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { PostState } from ".";
import { update } from "lodash";

const mutations: MutationTree<PostState> = {
  [MutationTypes.SET_POST_ANALYS_DATA](state, { data }: { data: any }) {
    state.post_analys_data = data;
  },

  [MutationTypes.SET_MOST_POPULAR_POSTS_ANALYS_DATA](
    state,
    { data }: { data: any }
  ) {
    state.most_popular_posts_analys_data = data;
  },

  [MutationTypes.SET_POST](state, { data }: { data: any }) {
    state.post = data;
  },

  [MutationTypes.SET_POSTS](state, { data }: { data: any[] }) {
    state.posts = data;
  },

  [MutationTypes.UPDATE_POST_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.post = update(state.post, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
