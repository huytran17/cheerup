import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { CommentState } from ".";

const mutations: MutationTree<CommentState> = {
  [MutationTypes.SET_COMMENT](state, { data }: { data: any }) {
    state.comment = data;
  },

  [MutationTypes.SET_COMMENTS](state, { data }: { data: any[] }) {
    state.comments = data;
  },
};

export default mutations;
