import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  is_open_reply_comment: false,
  is_open_login_requiring_snackbar: false,
  is_open_edit_comment: false,
  is_open_login_snackbar: false,
  login_redirect_url: "",
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  is_open_reply_comment: (state) => state.is_open_reply_comment,
  is_open_edit_comment: (state) => state.is_open_edit_comment,
  is_open_login_requiring_snackbar: (state) =>
    state.is_open_login_requiring_snackbar,
  login_redirect_url: (state) => state.login_redirect_url,
};

export const mutations: MutationTree<RootState> = {
  SET_IS_OPEN_REPLY_COMMENT(state, { data }: { data: boolean }) {
    state.is_open_reply_comment = data;
  },

  SET_IS_OPEN_EDIT_COMMENT(state, { data }: { data: boolean }) {
    state.is_open_edit_comment = data;
  },

  SET_LOGIN_REDIRECT_URL(state, { data }: { data: string }) {
    state.login_redirect_url = data;
  },

  SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR(state, { data }: { data: boolean }) {
    state.is_open_login_requiring_snackbar = data;
  },
};
