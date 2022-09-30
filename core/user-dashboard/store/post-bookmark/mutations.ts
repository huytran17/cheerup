import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { PostBookmarkState } from ".";
import _ from "lodash";

const mutations: MutationTree<PostBookmarkState> = {
  [MutationTypes.SET_POST_BOOKMARK](state, { data }: { data: any }) {
    state.post_bookmark = data;
  },

  [MutationTypes.SET_POST_BOOKMARKS](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
      state.post_bookmarks = data;
      return;
    }

    state.post_bookmarks = _.uniqBy(
      _.concat(state.post_bookmarks, data),
      "_id"
    );
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
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.UPDATE_POST_BOOKMARK_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.post_bookmark = _.update(
      state.post_bookmark,
      variable_path,
      (n) => data
    );
  },
};

export default mutations;
