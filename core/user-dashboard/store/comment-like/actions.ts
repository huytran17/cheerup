import { ActionTypes } from "./action-types";
import { ActionTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<CommentState, RootState> = {
  async [ActionTypes.CREATE_OR_UPDATE_COMMENT_LIKE](
    { commit },
    { data }: { data: any }
  ) {
    const { data: comment } = await this.$axios.$post("/comment-like", data);

    return comment;
  },
};

export default actions;
