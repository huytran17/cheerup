import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { PostBookmarkState } from ".";
import { uniqBy, concat, update } from "lodash";

const mutations: MutationTree<PostBookmarkState> = {
  [MutationTypes.SET_POST_BOOKMARK](state, { data }: { data: any }) {
    state.post_bookmark = data;
  },

  [MutationTypes.SET_POST_BOOKMARKS_COUNT](state, { data }: { data: number }) {
    state.post_bookmarks_count = data;
  },

  [MutationTypes.SET_POST_BOOKMARKS](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
      return (state.post_bookmarks = data);
    }

    state.post_bookmarks = uniqBy(concat(state.post_bookmarks, data), "_id");
  },

  [MutationTypes.SET_POST_BOOKMARK_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
        from: number;
        to: number;
        has_more: boolean;
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.UPDATE_POST_BOOKMARK_DATA](
    state,
    { path, data }: { path: string; data: any }
  ) {
    state.post_bookmark = update(state.post_bookmark, path, (n) => data);
  },
};

export default mutations;
