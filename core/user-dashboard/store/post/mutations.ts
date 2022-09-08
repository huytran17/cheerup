import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { PostState } from ".";
import _ from "lodash";

const mutations: MutationTree<PostState> = {
  [MutationTypes.SET_POST_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.SET_POST](state, { data }: { data: any }) {
    state.post = data;
  },

  [MutationTypes.SET_POST_SEARCH_QUERY](state, { data }: { data: string }) {
    state.post_search_query = data;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },

  [MutationTypes.SET_POSTS](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
      state.posts = data;
      return;
    }

    state.posts = _.uniqBy(_.concat(state.posts, data), "_id");
  },

  [MutationTypes.SET_LATEST_POSTS](state, { data }: { data: any[] }) {
    state.latest_posts = data;
  },
};

export default mutations;
