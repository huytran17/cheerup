import { GetterTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";

export const getters: GetterTree<CommentState, RootState> = {
  prefix() {
    return "/comment";
  },
  comment: (state) => state.comment,
  new_comment: (state) => state.new_comment,
  comments: (state) => state.comments,
  loading: (state) => state.loading,
};

export default getters;
