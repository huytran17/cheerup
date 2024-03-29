import { GetterTree } from "vuex";
import { PostBookmarkState } from ".";
import { RootState } from "..";

export const getters: GetterTree<PostBookmarkState, RootState> = {
  prefix() {
    return "/post-bookmark";
  },
  post_bookmark: (state) => state.post_bookmark,
  post_bookmarks: (state) => state.post_bookmarks,
  pagination: (state) => state.pagination,
  post_bookmarks_count: (state) => state.post_bookmarks_count,
};

export default getters;
