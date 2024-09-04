import { GetterTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";

export const getters: GetterTree<PostState, RootState> = {
  prefix() {
    return "/post";
  },
  post: (state) => state.post,
  post_analys_data: (state) => state.post_analys_data,
  posts: (state) => state.posts,
  most_popular_posts_analys_data: (state) =>
    state.most_popular_posts_analys_data,
  pagination: (state) => state.pagination,
};

export default getters;
