import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { AuthState } from "./";
import { RootState } from "..";

const actions: ActionTree<AuthState, RootState> = {
  async [ActionTypes.GET_ME]({ commit }) {
    const { data: user } = await this.$axios.$get("/auth/me");

    commit(MutationTypes.SET_ME, { data: user });
    commit(MutationTypes.SET_HAS_USER, { data: true });

    return user;
  },

  async [ActionTypes.SIGN_IN]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$post("/auth/sign-in", data);
    return user;
  },

  async [ActionTypes.SIGN_OUT]() {
    return await this.$axios.$post("/auth/sign-out");
  },

  async [ActionTypes.SIGN_UP]({ commit }, { data }: { data: any }) {
    return await this.$axios.$post("/auth/sign-up", data);
  },

  async [ActionTypes.VERIFY_2FA]({ commit }, { data }: { data: any }) {
    return await this.$axios.$post("/auth/verify-2fa", data);
  },

  async [ActionTypes.ENABLE_2FA]({ commit }, { data }: { data: any }) {
    const { data: tfa_data } = await this.$axios.$post(
      "/auth/enable-2fa",
      data
    );

    return tfa_data;
  },

  async [ActionTypes.DISABLE_2FA]({ commit }, { data }: { data: any }) {
    return await this.$axios.$post("/auth/disable-2fa", data);
  },

  async [ActionTypes.ENABLE_2FA_CONFIRMATION]() {
    return await this.$axios.$get("/auth/enable-2fa-confirmation");
  },

  async [ActionTypes.DISABLE_2FA_CONFIRMATION]() {
    return await this.$axios.$get("/auth/disable-2fa-confirmation");
  },
};

export default actions;
