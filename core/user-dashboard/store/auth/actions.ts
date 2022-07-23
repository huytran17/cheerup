import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { AuthState } from "./";
import { RootState } from "..";

const actions: ActionTree<AuthState, RootState> = {
  async [ActionTypes.SIGN_IN]({ commit }, { data }: { data: any }) {
    const { data: returned_data } = await this.$axios.$post(
      "/auth/sign-in",
      data
    );
    const { user, access_token } = returned_data;

    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }

    commit(MutationTypes.SET_ME, { data: user });
    return user;
  },

  async [ActionTypes.SIGN_OUT]({ commit }) {
    const { data } = await this.$axios.$post("/auth/sign-out");
    return data;
  },

  async [ActionTypes.SIGN_UP]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$post("/auth/sign-up", data);
    return user;
  },
};

export default actions;
