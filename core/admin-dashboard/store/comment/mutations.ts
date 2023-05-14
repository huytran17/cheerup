import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { CommentState } from ".";
import { update } from "lodash";

const mutations: MutationTree<CommentState> = {
  [MutationTypes.SET_COMMENT](state, { data }: { data: any }) {
    state.comment = data;
  },

  [MutationTypes.SET_COMMENTS](state, { data }: { data: any[] }) {
    state.comments = data;
  },

  [MutationTypes.UPDATE_COMMENT_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.comment = update(state.comment, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
