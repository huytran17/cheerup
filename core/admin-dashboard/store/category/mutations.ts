import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { CategoryState } from ".";
import { update } from "lodash";

const mutations: MutationTree<CategoryState> = {
  [MutationTypes.SET_CATEGORY](state, { data }: { data: any }) {
    state.category = data;
  },

  [MutationTypes.SET_CATEGORY_ANALYS_DATA](state, { data }: { data: any }) {
    state.category_analys_data = data;
  },

  [MutationTypes.SET_CATEGORIES](state, { data }: { data: any[] }) {
    state.categories = data;
  },

  [MutationTypes.UPDATE_CATEGORY_DATA](
    state,
    { path, data }: { path: string; data: any }
  ) {
    state.category = update(state.category, path, (n) => data);
  },
};

export default mutations;
