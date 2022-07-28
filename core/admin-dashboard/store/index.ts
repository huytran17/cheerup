import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  drawer: false,
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  drawer: (state) => state.drawer,
};

export const mutations: MutationTree<RootState> = {
  SET_DRAWER(state, { data }: { data: boolean }) {
    state.drawer = data;
  },
};
