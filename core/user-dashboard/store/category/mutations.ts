import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { CategoryState } from ".";
import _ from "lodash";

const mutations: MutationTree<CategoryState> = {
  [MutationTypes.SET_CATEGORY](state, { data }: { data: any }) {
    state.category = data;
  },

  [MutationTypes.SET_CATEGORIES](state, { data }: { data: any[] }) {
    state.categories = data;
  },

  [MutationTypes.SET_CATEGORIES](state, { data }: { data: any[] }) {
    state.category_titles = data;
  },
};

export default mutations;
