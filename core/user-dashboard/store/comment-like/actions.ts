import { ActionTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";

const actions: ActionTree<CommentState, RootState> = {
  async [ActionTypes.CREATE_OR_UPDATE_COMMENT_LIKE](
    { commit },
    { data }: { data: any }
  ) {
    await this.$axios.$post("/comment-like", data);
  },
};

export default actions;
