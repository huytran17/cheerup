import { GetterTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";

export const getters: GetterTree<PostState, RootState> = {
  prefix() {
    return "/post";
  },
  post: (state) => state.post,
  suggestion_posts: (state) => state.suggestion_posts,
  posts: (state) => state.posts,
  pagination: (state) => state.pagination,
  post_search_query: (state) => state.post_search_query,
  categories_filters: (state) => state.categories_filters,
  tags_filters: (state) => state.tags_filters,
};

export default getters;
