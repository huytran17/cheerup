import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  drawer: false,
  selected_nav_item: 0,
  is_open_search_box: false,
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  prefix() {
    return "/";
  },
  drawer: (state) => state.drawer,
  selected_nav_item: (state) => state.selected_nav_item,
  is_open_search_box: (state) => state.is_open_search_box,
};

export const mutations: MutationTree<RootState> = {
  SET_DRAWER(state, { data }: { data: boolean }) {
    state.drawer = data;
  },

  SET_SELECTED_NAV_ITEM(state, { data }: { data: number }) {
    state.selected_nav_item = data;
  },

  SET_SELECTED_SEARCH_BOX(state, { data }: { data: boolean }) {
    state.is_open_search_box = data;
  },
};
