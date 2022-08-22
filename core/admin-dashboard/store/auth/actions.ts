import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { AuthState } from "./";
import { RootState } from "..";

const actions: ActionTree<AuthState, RootState> = {
  async [ActionTypes.SIGN_IN]({ commit, state }, { data }: { data: any }) {
    const { data: authenticated_user } = await this.$axios.$post(
      "/auth/sign-in",
      data
    );
    const { user, access_token } = authenticated_user;

    if (access_token) {
      localStorage.setItem("admin_access_token", access_token);
    }

    commit(MutationTypes.SET_ME, { data: user });
    return user;
  },

  async [ActionTypes.SIGN_OUT]({ commit }) {
    const { data } = await this.$axios.$post("/auth/sign-out");
    return data;
  },

  async [ActionTypes.GET_ME]({ commit }) {
    const { data: user } = await this.$axios.$get("/auth/me");

    commit(MutationTypes.SET_ME, { data: user });
    commit(MutationTypes.SET_HAS_USER, { data: true });
    return user;
  },
};

export default actions;
