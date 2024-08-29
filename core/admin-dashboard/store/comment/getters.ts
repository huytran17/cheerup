import { GetterTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";

export const getters: GetterTree<CommentState, RootState> = {
  prefix() {
    return "/comment";
  },
  comment: (state) => state.comment,
  comments: (state) => state.comments,
  pagination: (state) => state.pagination,
};

export default getters;
