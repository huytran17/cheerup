import { update } from "lodash";
import { MutationTree } from "vuex";
import { CommentState } from ".";
import { MutationTypes } from "./mutation-types";

const mutations: MutationTree<CommentState> = {
  [MutationTypes.SET_COMMENT](state, { data }: { data: any }) {
    state.comment = data;
  },

  [MutationTypes.SET_COMMENTS](state, { data }: { data: any[] }) {
    state.comments = data;
  },

  [MutationTypes.SET_COMMENT_PAGINATION](
    state,
    { data }: { data: IPagination }
  ) {
    state.pagination = data;
  },

  [MutationTypes.UPDATE_COMMENT_PAGINATION](
    state,
    { path, data }: { path: string; data: IPagination }
  ) {
    state.pagination = update(state.pagination, path, (n) => data);
  },
};

export default mutations;
