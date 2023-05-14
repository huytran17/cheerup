import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { CommentState } from ".";
import { uniqBy, update, concat } from "lodash";

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

  [MutationTypes.SET_COMMENT_COUNT_BY_POST](state, { data }: { data: any }) {
    state.comment_count_by_post = data;
  },

  [MutationTypes.UPDATE_COMMENTS_DATA](state, { data }: { data: any }) {
    state.comments = data;
  },

  [MutationTypes.SET_COMMENTS](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
      return (state.comments = data);
    }

    state.comments = uniqBy(concat(state.comments, data), "_id");
  },

  [MutationTypes.UPDATE_COMMENT_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.comment = update(state.comment, variable_path, (n) => {
      return data;
    });
  },

  [MutationTypes.UPDATE_NEW_COMMENT_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.new_comment = update(state.new_comment, variable_path, (n) => {
      return data;
    });
  },

  [MutationTypes.UPDATE_EDITING_COMMENT_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.editing_comment = update(
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
    state.new_reply_comment = update(
      state.new_reply_comment,
      variable_path,
      (n) => {
        return data;
      }
    );
  },
};

export default mutations;
