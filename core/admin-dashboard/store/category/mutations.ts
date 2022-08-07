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

  [MutationTypes.UPDATE_CATEGORY_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.category = _.update(state.category, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
