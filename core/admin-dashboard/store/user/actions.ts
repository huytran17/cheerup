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
    return data;
  },

  async [ActionTypes.UPDATE_USER_PASSWORD](
    { commit },
    { data }: { data: any }
  ) {
    const { data: user } = await this.$axios.$put(`/user/password`, data);
    return user;
  },

  async [ActionTypes.GET_USERS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data: users } = await this.$axios.$get("/user");

    if (!keep_in_store) {
      return users;
    }

    commit(MutationTypes.SET_USERS, { data: users });
    return users;
  },

  async [ActionTypes.BLOCK_USER_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: user } = await this.$axios.$put(`/user/block-comment/${id}`);
    return user;
  },

  async [ActionTypes.UNBLOCK_USER_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: user } = await this.$axios.$put(
      `/user/un-block-comment/${id}`
    );
    return user;
  },

  async [ActionTypes.GET_USER]({ commit }, { id }: { id: string }) {
    const { data: user } = await this.$axios.$get(`/user/${id}`);

    commit(MutationTypes.SET_USER, { data: user });
    return user;
  },

  async [ActionTypes.CREATE_USER]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$post(`/user`, data);
    return user;
  },

  async [ActionTypes.UPDATE_USER]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$put(`/user`, data);

    commit(MutationTypes.SET_USER, { data: user });
    return user;
  },

  async [ActionTypes.DELETE_USER]({ commit }, { id }: { id: string }) {
    const { data: user } = await this.$axios.$delete(`/user/${id}`);
    return user;
  },

  async [ActionTypes.HARD_DELETE_USER]({ commit }, { id }: { id: string }) {
    const { data: user } = await this.$axios.$delete(`/user/hard-delete/${id}`);
    return user;
  },

  async [ActionTypes.RESTORE_USER]({ commit }, { id }: { id: string }) {
    const { data: user } = await this.$axios.$put(`/user/restore/${id}`);
    return user;
  },

  async [ActionTypes.RESET_USER_LOGIN_FAILED_TIMES](
    { commit },
    { id }: { id: string }
  ) {
    const { data: user } = await this.$axios.$put(
      `/user/reset-user-login-failed-times/${id}`
    );

    return user;
  },

  async [ActionTypes.BATCH_UPLOAD_USERS]({ commit }, params = {}) {
    const file = get(params, "file", {});

    const form_data = new FormData();
    form_data.append("file", file);

    const data = await this.$axios.post(
      `/v2/batch/admin/upload-users`,
      form_data
    );

    return data;
  },
};

export default actions;
