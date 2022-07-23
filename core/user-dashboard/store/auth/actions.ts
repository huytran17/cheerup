import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { AuthState } from "./";
import { RootState } from "..";

const actions: ActionTree<AuthState, RootState> = {
  async [ActionTypes.SIGN_IN]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$get("/auth/sign-in", data);
    commit(MutationTypes.SET_ME, user);
    return user;
  },

  async [ActionTypes.SIGN_OUT]({ commit }) {
    const { data } = await this.$axios.$get("/auth/sign-out");
    return data;
  },

  async [ActionTypes.SIGN_UP]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$get("/auth/sign-up");
    return user;
  },
};

export default actions;
