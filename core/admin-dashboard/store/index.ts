import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  app_loading: false,
  analysis_unit: "month",
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  app_loading: (state) => state.app_loading,
  analysis_unit: (state) => state.analysis_unit,
};

export const mutations: MutationTree<RootState> = {
  SET_APP_LOADING(state, { data }: { data: boolean }) {
    state.app_loading = data;
  },

  SET_ANALYSIS_UNIT(state, { data }: { data: string }) {
    state.analysis_unit = data;
  },
};
