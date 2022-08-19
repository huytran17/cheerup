import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { UserState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<UserState, RootState> = {
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
    const { data: user } = await this.$axios.$get(`/user/block-comment/${id}`);
    return user;
  },

  async [ActionTypes.UNBLOCK_USER_COMMENT]({ commit }, { id }: { id: string }) {
    const { data: user } = await this.$axios.$get(`/user/un-block-comment/${id}`);
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

    commit(MutationTypes.SET_USER, { data: user });

    return user;
  },

  async [ActionTypes.HARD_DELETE_USER]({ commit }, { id }: { id: string }) {
    const { data: user } = await this.$axios.$delete(`/user/hard-delete/${id}`);

    commit(MutationTypes.SET_USER, { data: user });

    return user;
  },

  async [ActionTypes.UPLOAD_USER_AVATAR]({ commit }, { file }: { file: any }) {
    const form_data = new FormData();
    form_data.append("file", file);

    const { data: user } = await this.$axios.$put(
      `/user/upload-avatar`,
      form_data
    );

    return user;
  },
};

export default actions;
