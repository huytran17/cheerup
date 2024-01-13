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
    const returned_data = await this.$axios.$post(
      "/auth/sign-in",
      data
    );

    return returned_data;
  },

  async [ActionTypes.SIGN_OUT]() {
    const { data } = await this.$axios.$post("/auth/sign-out");

    const { valid_signout } = data;

    if (valid_signout) {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }

    return valid_signout;
  },

  async [ActionTypes.SIGN_UP]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$post("/auth/sign-up", data);
    return user;
  },

  async [ActionTypes.VERIFY_2FA]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$post("/auth/verify-2fa", data);
    return user;
  },

  async [ActionTypes.ENABLE_2FA]({ commit }, { data }: { data: any }) {
    const { data: two_fa } = await this.$axios.$post("/auth/enable-2fa", data);
    return two_fa;
  },

  async [ActionTypes.DISABLE_2FA]({ commit }, { data }: { data: any }) {
    const { data: two_fa } = await this.$axios.$post("/auth/disable-2fa", data);
    return two_fa;
  },

  async [ActionTypes.ENABLE_2FA_CONFIRMATION]() {
    const data = await this.$axios.$get("/auth/enable-2fa-confirmation");
    return data;
  },

  async [ActionTypes.DISABLE_2FA_CONFIRMATION]() {
    const data = await this.$axios.$get("/auth/disable-2fa-confirmation");
    return data;
  },
};

export default actions;
