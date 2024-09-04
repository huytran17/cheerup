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
    { path, data }: { path: string; data: any }
  ) {
    state.post = update(state.post, path, (n) => data);
  },

  [MutationTypes.SET_POST_PAGINATION](state, { data }: { data: IPagination }) {
    state.pagination = data;
  },

  [MutationTypes.UPDATE_POST_PAGINATION](
    state,
    { path, data }: { path: string; data: any }
  ) {
    state.pagination = update(state.pagination, path, (n) => data);
  },
};

export default mutations;
