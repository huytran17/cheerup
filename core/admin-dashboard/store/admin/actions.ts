import { ADMIN_TYPES } from "@/constants";
import { get, join } from "lodash";
import { ActionTree } from "vuex";
import { AdminState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<AdminState, RootState> = {
  async [ActionTypes.GET_ADMIN_ANALYTICS]({ commit }, params = {}) {
    const range = get(params, "range", []);
    const unit = get(params, "unit", "month");
    const author_type = get(params, "author_type", ADMIN_TYPES.OWNER);

    let url_query = new URLSearchParams();

    const has_range = range && range.length;

    has_range && url_query.set("range", join(range));

    unit && url_query.set("unit", unit);

    author_type && url_query.set("author_type", author_type);

    const { data } = await this.$axios.$get(`/admin/analystics?${url_query}`);
    commit(MutationTypes.SET_ADMIN_ANALYS_DATA, { data });
  },

  async [ActionTypes.GET_ADMINS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data } = await this.$axios.$get("/admin");

    if (!keep_in_store) {
      return data;
    }

    commit(MutationTypes.SET_ADMINS, { data });
    return data;
  },

  async [ActionTypes.UPDATE_ADMIN_PASSWORD](
    { commit },
    { data }: { data: any }
  ) {
    await this.$axios.$put(`/admin/password`, data);
  },

  async [ActionTypes.UPDATE_ADMIN_PERSONAL_PASSWORD](
    { commit },
    { data }: { data: any }
  ) {
    await this.$axios.$put(`/admin/personal-password`, data);
  },

  async [ActionTypes.RESTORE_ADMIN]({ commit }, { id }: { id: string }) {
    await this.$axios.$put(`/admin/restore/${id}`);
  },

  async [ActionTypes.GET_ADMIN]({ commit }, { id }: { id: string }) {
    const { data } = await this.$axios.$get(`/admin/${id}`);
    commit(MutationTypes.SET_ADMIN, { data });
  },

  async [ActionTypes.CREATE_ADMIN]({ commit }, { data }: { data: any }) {
    const { data: admin } = await this.$axios.$post(`/admin`, data);
    return admin;
  },

  async [ActionTypes.UPDATE_ADMIN]({ commit }, { data }: { data: any }) {
    await this.$axios.$put(`/admin`, data);
  },

  async [ActionTypes.DELETE_ADMIN]({ commit }, { id }: { id: string }) {
    await this.$axios.$delete(`/admin/${id}`);
  },

  async [ActionTypes.HARD_DELETE_ADMIN]({ commit }, { id }: { id: string }) {
    await this.$axios.$delete(`/admin/hard-delete/${id}`);
  },

  async [ActionTypes.RESET_ADMIN_LOGIN_FAILED_TIMES](
    { commit },
    { id }: { id: string }
  ) {
    await this.$axios.$put(`/admin/reset-admin-login-failed-times/${id}`);
  },

  async [ActionTypes.BATCH_UPLOAD_ADMINS]({ commit }, params = {}) {
    const file = get(params, "file");

    const form_data = new FormData();
    form_data.append("file", file);

    await this.$axios.post(`/v2/batch/admin/upload-admins`, form_data);
  },

  async [ActionTypes.GET_ADMINS_PAGINATED]({ commit }, params = {}) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);

    const query_url = new URLSearchParams();

    query && query_url.set("query", query);
    page && query_url.set("page", page);
    entries_per_page && query_url.set("entries_per_page", entries_per_page);

    const { data: admins, pagination } = await this.$axios.$get(
      `/admin/all-paginated?${query_url}`
    );

    commit(MutationTypes.SET_ADMINS, { data: admins });
    commit(MutationTypes.SET_ADMIN_PAGINATION, { data: pagination });

    return admins;
  },
};

export default actions;
