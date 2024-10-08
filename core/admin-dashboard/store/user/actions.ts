import { get, join } from "lodash";
import { ActionTree } from "vuex";
import { UserState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<UserState, RootState> = {
  async [ActionTypes.GET_USER_ANALYTICS]({ commit }, params = {}) {
    const range = get(params, "range", []);
    const unit = get(params, "unit", "month");

    let url_query = new URLSearchParams();

    const has_range = range && range.length;

    has_range && url_query.set("range", join(range));

    unit && url_query.set("unit", unit);

    const { data } = await this.$axios.$get(`/user/analystics?${url_query}`);
    commit(MutationTypes.SET_USER_ANALYS_DATA, { data });
  },

  async [ActionTypes.UPDATE_USER_PASSWORD](
    { commit },
    { data }: { data: any }
  ) {
    await this.$axios.$put(`/user/password`, data);
  },

  async [ActionTypes.GET_USERS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data } = await this.$axios.$get("/user");

    if (!keep_in_store) {
      return data;
    }

    commit(MutationTypes.SET_USERS, { data });
  },

  async [ActionTypes.BLOCK_USER_COMMENT]({ commit }, { id }: { id: string }) {
    await this.$axios.$put(`/user/block-comment/${id}`);
  },

  async [ActionTypes.UNBLOCK_USER_COMMENT]({ commit }, { id }: { id: string }) {
    await this.$axios.$put(`/user/un-block-comment/${id}`);
  },

  async [ActionTypes.GET_USER]({ commit }, { id }: { id: string }) {
    const { data } = await this.$axios.$get(`/user/${id}`);
    commit(MutationTypes.SET_USER, { data });
  },

  async [ActionTypes.CREATE_USER]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$post(`/user`, data);
    return user;
  },

  async [ActionTypes.UPDATE_USER]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$put(`/user`, data);
    commit(MutationTypes.SET_USER, { data: user });
  },

  async [ActionTypes.DELETE_USER]({ commit }, { id }: { id: string }) {
    await this.$axios.$delete(`/user/${id}`);
  },

  async [ActionTypes.HARD_DELETE_USER]({ commit }, { id }: { id: string }) {
    await this.$axios.$delete(`/user/hard-delete/${id}`);
  },

  async [ActionTypes.RESTORE_USER]({ commit }, { id }: { id: string }) {
    await this.$axios.$put(`/user/restore/${id}`);
  },

  async [ActionTypes.RESET_USER_LOGIN_FAILED_TIMES](
    { commit },
    { id }: { id: string }
  ) {
    await this.$axios.$put(`/user/reset-user-login-failed-times/${id}`);
  },

  async [ActionTypes.BATCH_UPLOAD_USERS]({ commit }, params = {}) {
    const file = get(params, "file");

    const form_data = new FormData();
    form_data.append("file", file);

    await this.$axios.post(`/v2/batch/user/upload-users`, form_data);
  },

  async [ActionTypes.GET_USERS_PAGINATED]({ commit }, params = {}) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);

    const query_url = new URLSearchParams();

    query && query_url.set("query", query);
    page && query_url.set("page", page);
    entries_per_page && query_url.set("entries_per_page", entries_per_page);

    const { data, pagination } = await this.$axios.$get(
      `/user/all-paginated?${query_url}`
    );

    commit(MutationTypes.SET_USERS, { data });
    commit(MutationTypes.SET_USER_PAGINATION, { data: pagination });
  },
};

export default actions;
