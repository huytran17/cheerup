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

  async [ActionTypes.VERIFY_ACCESS](
    { commit },
    { access_token }: { access_token: string }
  ) {
    const { data } = await this.$axios.$post("/auth/verify-access", {
      access_token,
    });

    return data;
  },

  async [ActionTypes.SIGN_IN]({ commit }, { data }: { data: any }) {
    const { data: returned_data } = await this.$axios.$post(
      "/auth/sign-in",
      data
    );
    const { user, access_token } = returned_data;

    access_token && localStorage.setItem("access_token", access_token);

    commit(MutationTypes.SET_ME, { data: user });
    return user;
  },

  async [ActionTypes.SIGN_OUT]({ commit }) {
    const { data } = await this.$axios.$post("/auth/sign-out");

    const { valid_signout } = data;

    if (valid_signout) {
      localStorage.removeItem("access_token");
      window.location.replace("");
    }

    return valid_signout;
  },

  async [ActionTypes.SIGN_UP]({ commit }, { data }: { data: any }) {
    const { data: user } = await this.$axios.$post("/auth/sign-up", data);
    return user;
  },
};

export default actions;
