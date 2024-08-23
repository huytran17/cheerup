import { get, join } from "lodash";
import { ActionTree } from "vuex";
import { CategoryState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<CategoryState, RootState> = {
  async [ActionTypes.GET_CATEGORY_ANALYTICS]({ commit }, params = {}) {
    const range = get(params, "range", []);
    const unit = get(params, "unit", "month");
    const limit = get(params, "limit", 6);

    let url_query = new URLSearchParams();

    const has_range = range && range.length;

    has_range && url_query.set("range", join(range));

    unit && url_query.set("unit", unit);

    limit && url_query.set("limit", limit);

    const { data } = await this.$axios.$get(
      `/category/analystics?${url_query}`
    );
    commit(MutationTypes.SET_CATEGORY_ANALYS_DATA, { data });
  },
  async [ActionTypes.GET_CATEGORIES]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data } = await this.$axios.$get("/category");

    if (!keep_in_store) {
      return data;
    }

    commit(MutationTypes.SET_CATEGORIES, { data });
  },

  async [ActionTypes.GET_CATEGORY]({ commit }, { id }: { id: string }) {
    const { data } = await this.$axios.$get(`/category/${id}`);
    commit(MutationTypes.SET_CATEGORY, { data });
  },

  async [ActionTypes.CREATE_CATEGORY]({ commit }, { data }: { data: any }) {
    const { data: category } = await this.$axios.$post(`/category`, data);
    return category;
  },

  async [ActionTypes.UPDATE_CATEGORY]({ commit }, { data }: { data: any }) {
    const { _id } = data;
    const { data: category } = await this.$axios.$put(`/category/${_id}`, data);

    commit(MutationTypes.SET_CATEGORY, { data: category });
  },

  async [ActionTypes.DELETE_CATEGORY]({ commit }, { id }: { id: string }) {
    await this.$axios.$delete(`/category/${id}`);
  },

  async [ActionTypes.RESTORE_CATEGORY]({ commit }, { id }: { id: string }) {
    await this.$axios.$put(`/category/restore/${id}`);
  },

  async [ActionTypes.HARD_DELETE_CATEGORY]({ commit }, { id }: { id: string }) {
    await this.$axios.$delete(`/category/hard-delete/${id}`);
  },
};

export default actions;
