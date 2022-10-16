import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { CommentState } from ".";
import _ from "lodash";

const mutations: MutationTree<CommentState> = {
  [MutationTypes.SET_COMMENT_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.SET_COMMENT](state, { data }: { data: any }) {
    state.comment = data;
  },

  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },

  [MutationTypes.UPDATE_COMMENTS_DATA](state, { data }: { data: any }) {
    state.comments = data;
  },

  [MutationTypes.SET_COMMENTS](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
      state.comments = data;
      return;
    }

    state.comments = _.uniqBy(_.concat(state.comments, data), "_id");
  },

  [MutationTypes.UPDATE_COMMENT_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.comment = _.update(state.comment, variable_path, (n) => {
      return data;
    });
  },

  [MutationTypes.UPDATE_NEW_COMMENT_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.new_comment = _.update(state.new_comment, variable_path, (n) => {
      return data;
    });
  },

  [MutationTypes.UPDATE_EDITING_COMMENT_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.editing_comment = _.update(
      state.editing_comment,
      variable_path,
      (n) => {
        return data;
      }
    );
  },

  [MutationTypes.UPDATE_NEW_REPLY_COMMENT_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.new_reply_comment = _.update(
      state.new_reply_comment,
      variable_path,
      (n) => {
        return data;
      }
    );
  },
};

export default mutations;
