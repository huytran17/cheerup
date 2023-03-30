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

  [MutationTypes.SET_CATEGORIES_FILTERS](state, { data }: { data: string[] }) {
    state.categories_filters = data;
  },

  [MutationTypes.SET_TAGS_FILTERS](state, { data }: { data: string[] }) {
    state.tags_filters = data;
  },

  [MutationTypes.SET_POST_SEARCH_QUERY](state, { data }: { data: string }) {
    state.post_search_query = data;
  },

  [MutationTypes.SET_POSTS](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
     return (state.posts = data);
    }

    state.posts = _.uniqBy(_.concat(state.posts, data), "_id");
  },

  [MutationTypes.SET_SUGGESTION_POSTS](state, { data }: { data: any[] }) {
    state.suggestion_posts = data;
  },
};

export default mutations;
