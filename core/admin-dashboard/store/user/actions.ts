import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { UserState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<UserState, RootState> = {
  async [ActionTypes.GET_USER_ANALYTICS]({ commit }, params = {}) {
    const range = _.get(params, "range", []);
    const unit = _.get(params, "unit", "month");

    let url_query = new URLSearchParams();

    const has_range = range && range.length;
    if (has_range) {
      url_query.set("range", _.join(range));
    }

    if (unit) {
      url_query.set("unit", unit);
    }

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
    const keep_in_store = _.get(params, "keep_in_store", true);

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
};

export default actions;
