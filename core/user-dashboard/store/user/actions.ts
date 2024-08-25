import { ActionTree } from "vuex";
import { UserState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<UserState, RootState> = {
  async [ActionTypes.UPDATE_USER_PASSWORD](
    { commit },
    { data }: { data: any }
  ) {
    await this.$axios.$put(`/user/password`, data);
  },

  async [ActionTypes.VERIFY_EMAIL]({ commit }, { data }: { data: any }) {
    await this.$axios.$post(`/user/verify-email`, data);
  },

  async [ActionTypes.UPDATE_USER]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$put(`/user`, data);
    commit(MutationTypes.SET_USER, { data: user });
  },
};

export default actions;
