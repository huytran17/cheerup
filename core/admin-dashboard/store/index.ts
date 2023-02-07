import { ActionTree, MutationTree, GetterTree } from "vuex";
import { update } from "lodash";
import moment from "moment";

export const state = () => ({
  app_loading: false,
  analysis: {
    unit: "month",
    range: [
      moment().subtract(1, "years").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ],
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

  UPDATE_ANALYSIS_DATA(
    state,
    { data, variable_path }: { data: any; variable_path: string }
  ) {
    state.analysis = update(state.analysis, variable_path, (n) => {
      return data;
    });
  },
};
