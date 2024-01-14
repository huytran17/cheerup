import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  is_open_reply_comment: false,
  is_open_edit_comment: false,
  is_app_loading: false,
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  is_open_reply_comment: (state) => state.is_open_reply_comment,
  is_open_edit_comment: (state) => state.is_open_edit_comment,
  is_app_loading: (state) => state.is_app_loading,
};

export const mutations: MutationTree<RootState> = {
  SET_IS_OPEN_REPLY_COMMENT(state, { data }: { data: boolean }) {
    state.is_open_reply_comment = data;
  },

  SET_IS_OPEN_EDIT_COMMENT(state, { data }: { data: boolean }) {
    state.is_open_edit_comment = data;
  },

  SET_IS_APP_LOADING(state, { data }: { data: boolean }) {
    state.is_app_loading = data;
  },
};
