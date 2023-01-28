import { GetterTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";

export const getters: GetterTree<CommentState, RootState> = {
  prefix() {
    return "/comment-like";
  },
};

export default getters;
