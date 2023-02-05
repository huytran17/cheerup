import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  app_loading: false,
  analysis: {
    unit: "month",
    distance: 12,
  },
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  app_loading: (state) => state.app_loading,
  analysis: (state) => state.analysis,
};

export const mutations: MutationTree<RootState> = {
  SET_APP_LOADING(state, { data }: { data: boolean }) {
    state.app_loading = data;
  },

  SET_ANALYSIS_DATA(state, { data }: { data: any }) {
    state.analysis = data;
  },
};
