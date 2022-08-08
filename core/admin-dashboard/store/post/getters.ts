import { GetterTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";

export const getters: GetterTree<PostState, RootState> = {
  prefix() {
    return "/post";
  },
  post: (state) => state.post,
  posts: (state) => state.posts,
};

export default getters;
