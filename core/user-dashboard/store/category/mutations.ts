import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { CategoryState } from ".";
import _ from "lodash";

const mutations: MutationTree<CategoryState> = {
  [MutationTypes.SET_CATEGORY](state, { data }: { data: any }) {
    state.category = data;
  },

  [MutationTypes.SET_CATEGORIES_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
        from: number;
        to: number;
        has_more: boolean;
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.SET_CATEGORIES](state, { data }: { data: any[] }) {
    state.categories = data;
  },

  [MutationTypes.SET_CATEGORY_TITLES](state, { data }: { data: any[] }) {
    state.category_titles = data;
  },
};

export default mutations;
