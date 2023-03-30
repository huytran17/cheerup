import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { AdminState } from ".";
import { RootState } from "..";
import { ADMIN_TYPES } from "@/constants";
import _ from "lodash";

const actions: ActionTree<AdminState, RootState> = {
  async [ActionTypes.GET_ADMIN_ANALYTICS]({ commit }, params = {}) {
    const range = _.get(params, "range", []);
    const unit = _.get(params, "unit", "month");
    const author_type = _.get(params, "author_type", ADMIN_TYPES.OWNER);

    let url_query = new URLSearchParams();

    const has_range = range && range.length;

    has_range && url_query.set("range", _.join(range));

    unit && url_query.set("unit", unit);

    author_type && url_query.set("author_type", author_type);

    const { data } = await this.$axios.$get(`/admin/analystics?${url_query}`);
    commit(MutationTypes.SET_ADMIN_ANALYS_DATA, { data });
    return data;
  },

  async [ActionTypes.GET_ADMINS]({ commit }, params = {}) {
    const keep_in_store = _.get(params, "keep_in_store", true);

    const { data: admins } = await this.$axios.$get("/admin");

    if (!keep_in_store) {
      return admins;
    }

    commit(MutationTypes.SET_ADMINS, { data: admins });
    return admins;
  },

  async [ActionTypes.ENABLE_AUTO_CENSORSHIP_POST](
    { commit },
    { id }: { id: string }
  ) {
    const { data: admin } = await this.$axios.$put(
      `/admin/enable-auto-censorship/${id}`
    );
    return admin;
  },

  async [ActionTypes.UPDATE_ADMIN_PASSWORD](
    { commit },
    { data }: { data: any }
  ) {
    const { data: admin } = await this.$axios.$put(`/admin/password`, data);
    return admin;
  },

  async [ActionTypes.UPDATE_ADMIN_PERSONAL_PASSWORD](
    { commit },
    { data }: { data: any }
  ) {
    const { data: admin } = await this.$axios.$put(
      `/admin/personal-password`,
      data
    );
    return admin;
  },

  async [ActionTypes.RESTORE_ADMIN]({ commit }, { id }: { id: string }) {
    const { data: admin } = await this.$axios.$put(`/admin/restore/${id}`);
    return admin;
  },

  async [ActionTypes.DISABLE_AUTO_CENSORSHIP_POST](
    { commit },
    { id }: { id: string }
  ) {
    const { data: admin } = await this.$axios.$put(
      `/admin/disable-auto-censorship/${id}`
    );
    return admin;
  },

  async [ActionTypes.GET_ADMIN]({ commit }, { id }: { id: string }) {
    const { data: admin } = await this.$axios.$get(`/admin/${id}`);

    commit(MutationTypes.SET_ADMIN, { data: admin });
    return admin;
  },

  async [ActionTypes.CREATE_ADMIN]({ commit }, { data }: { data: any }) {
    const { data: admin } = await this.$axios.$post(`/admin`, data);
    return admin;
  },

  async [ActionTypes.UPDATE_ADMIN]({ commit }, { data }: { data: any }) {
    const { data: admin } = await this.$axios.$put(`/admin`, data);

    commit(MutationTypes.SET_ADMIN, { data: admin });
    return admin;
  },

  async [ActionTypes.DELETE_ADMIN]({ commit }, { id }: { id: string }) {
    const { data: admin } = await this.$axios.$delete(`/admin/${id}`);
    return admin;
  },

  async [ActionTypes.HARD_DELETE_ADMIN]({ commit }, { id }: { id: string }) {
    const { data: admin } = await this.$axios.$delete(
      `/admin/hard-delete/${id}`
    );
    return admin;
  },
};

export default actions;
