import { ActionTree } from "vuex";
import { RootState } from "..";
import { AuthState } from "./";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<AuthState, RootState> = {
  async [ActionTypes.SIGN_IN]({ commit }, { data }: { data: any }) {
    await this.$axios.$post("/auth/sign-in", data);
    commit(MutationTypes.SET_HAS_USER, { data: true });
  },

  async [ActionTypes.SIGN_OUT]() {
    await this.$axios.$post("/auth/sign-out");
  },

  async [ActionTypes.GET_ME]({ commit }) {
    const { data } = await this.$axios.$get("/auth/me");

    commit(MutationTypes.SET_ME, { data });
    commit(MutationTypes.SET_HAS_USER, { data: true });

    return data;
  },
};

export default actions;
