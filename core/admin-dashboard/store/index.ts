import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  drawer: false,
  app_loading: true,
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  drawer: (state) => state.drawer,
  app_loading: (state) => state.app_loading,
};

export const mutations: MutationTree<RootState> = {
  SET_DRAWER(state, { data }: { data: boolean }) {
    state.drawer = data;
  },
  SET_APP_LOADING(state, { data }: { data: boolean }) {
    state.app_loading = data;
  },
};
