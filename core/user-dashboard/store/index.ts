import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  drawer: false,
  login_redirect_url: "",
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  drawer: (state) => state.drawer,
  login_redirect_url: (state) => state.login_redirect_url,
};

export const mutations: MutationTree<RootState> = {
  SET_DRAWER(state, { data }: { data: boolean }) {
    state.drawer = data;
  },

  SET_LOGIN_REDIRECT_URL(state, { data }: { data: string }) {
    state.login_redirect_url = data;
  },
};
