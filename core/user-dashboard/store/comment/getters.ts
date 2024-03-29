import { GetterTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";

export const getters: GetterTree<CommentState, RootState> = {
  prefix() {
    return "/comment";
  },
  comment: (state) => state.comment,
  new_comment: (state) => state.new_comment,
  editing_comment: (state) => state.editing_comment,
  new_reply_comment: (state) => state.new_reply_comment,
  comments: (state) => state.comments,
  pagination: (state) => state.pagination,
  comment_count_by_post: (state) => state.comment_count_by_post,
};

export default getters;
