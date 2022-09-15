import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  is_open_reply_comment: false,
  login_redirect_url: "",
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  is_open_reply_comment: (state) => state.is_open_reply_comment,
  login_redirect_url: (state) => state.login_redirect_url,
};

export const mutations: MutationTree<RootState> = {
  SET_IS_OPEN_REPLY_COMMENT(state, { data }: { data: boolean }) {
    state.is_open_reply_comment = data;
  },

  SET_LOGIN_REDIRECT_URL(state, { data }: { data: string }) {
    state.login_redirect_url = data;
  },
};
