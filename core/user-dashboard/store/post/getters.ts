import { GetterTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";

export const getters: GetterTree<PostState, RootState> = {
  prefix() {
    return "/post";
  },
  post: (state) => state.post,
  latest_posts: (state) => state.latest_posts,
  posts: (state) => state.posts,
};

export default getters;
