import { get } from "lodash";
import { ActionTree } from "vuex";
import { CategoryState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<CategoryState, RootState> = {
  async [ActionTypes.GET_CATEGORY_BY_SLUG](
    { commit },
    { slug }: { slug: string }
  ) {
    const { data } = await this.$axios.$get(`/category/by-slug/${slug}`);
    commit(MutationTypes.SET_CATEGORY, { data });

    return data;
  },

  async [ActionTypes.GET_CATEGORY_TITLES]({ commit }) {
    const { data } = await this.$axios.$get(`/category/titles`);
    commit(MutationTypes.SET_CATEGORY_TITLES, { data });
  },

  async [ActionTypes.GET_OUTSTANDING_CATEGORIES_PAGINATED](
    { commit, state },
    params = {}
  ) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);
    const new_state = get(params, "new_state", true);
    const keep_in_store = get(params, "keep_in_store", true);

    const url_query = new URLSearchParams();

    query && url_query.set("query", query);

    page && url_query.set("page", page);

    entries_per_page && url_query.set("entries_per_page", entries_per_page);

    const { data, pagination } = await this.$axios.$get(
      `/category/outstanding-paginated?${url_query}`
    );

    if (!keep_in_store) {
      return { data, pagination };
    }

    commit(MutationTypes.SET_CATEGORIES, { data, new_state });
    commit(MutationTypes.SET_CATEGORIES_PAGINATION, { data: pagination });
  },
};

export default actions;
