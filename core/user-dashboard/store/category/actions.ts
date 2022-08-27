import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { CategoryState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<CategoryState, RootState> = {
  async [ActionTypes.GET_CATEGORIES]({ commit }, params = {}) {
    const keep_in_store = _.get(params, "keep_in_store", true);

    const { data: categories } = await this.$axios.$get("/category");

    if (!keep_in_store) {
      return categories;
    }

    commit(MutationTypes.SET_CATEGORIES, { data: categories });

    return categories;
  },

  async [ActionTypes.GET_CATEGORY]({ commit }, { id }: { id: string }) {
    const { data: category } = await this.$axios.$get(`/category/${id}`);

    commit(MutationTypes.SET_CATEGORY, { data: category });

    return category;
  },
};

export default actions;
