import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { AuthState } from "./";
import { RootState } from "..";

const actions: ActionTree<AuthState, RootState> = {
  async [ActionTypes.SIGN_IN]({ commit }, { data }: { data: any }) {
    const returned_data = await this.$axios.$post("/auth/sign-in", data);

    commit(MutationTypes.SET_HAS_USER, { data: true });
    return returned_data;
  },

  async [ActionTypes.SIGN_OUT]() {
    const { data } = await this.$axios.$post("/auth/sign-out");

    localStorage.removeItem("admin_access_token");
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
