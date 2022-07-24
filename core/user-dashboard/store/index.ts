import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  drawer: false,
  selected_nav_item: 0,
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  drawer: (state) => state.drawer,
  selected_nav_item: (state) => state.selected_nav_item,
};

export const mutations: MutationTree<RootState> = {
  SET_DRAWER(state, { data }: { data: boolean }) {
    state.drawer = data;
  },

  SET_SELECTED_NAV_ITEM(state, { data }: { data: number }) {
    state.selected_nav_item = data;
  },
};
