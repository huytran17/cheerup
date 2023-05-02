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

  async [ActionTypes.GET_CATEGORY_BY_SLUG](
    { commit },
    { slug }: { slug: string }
  ) {
    const { data: category } = await this.$axios.$get(
      `/category/by-slug/${slug}`
    );

    commit(MutationTypes.SET_CATEGORY, { data: category });

    return category;
  },

  async [ActionTypes.GET_CATEGORY_TITLES]({ commit }) {
    const { data } = await this.$axios.$get(`/category/titles`);

    commit(MutationTypes.SET_CATEGORY_TITLES, { data });

    return data;
  },

  async [ActionTypes.GET_OUTSTANDING_CATEGORIES_PAGINATED](
    { commit, state },
    params = {}
  ) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);
    const entries_per_page = _.get(params, "entries_per_page", 15);
    const new_state = _.get(params, "new_state", true);

    const url_query = new URLSearchParams();

    query && url_query.set("query", query);

    page && url_query.set("page", page);

    entries_per_page && url_query.set("entries_per_page", entries_per_page);

    const { data: categories, pagination } = await this.$axios.$get(
      `/category/outstanding-paginated?${url_query}`
    );

    commit(MutationTypes.SET_CATEGORIES, { data: categories, new_state });
    commit(MutationTypes.SET_CATEGORIES_PAGINATION, { data: pagination });

    return categories;
  },
};

export default actions;
