import { ActionTree } from "vuex";
import { PasswordResetState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<PasswordResetState, RootState> = {
  async [ActionTypes.GET_PASSWORD_RESET_BY_CODE](
    { commit },
    { security_code }: { security_code: string }
  ) {
    const { data } = await this.$axios.$post("/password-reset/by-code", {
      security_code,
    });
    commit(MutationTypes.SET_PASSWORD_RESET, { data });

    return data;
  },

  async [ActionTypes.CREATE_PASSWORD_RESET](
    { commit },
    { data }: { data: any }
  ) {
    await this.$axios.$post(`/password-reset`, data);
  },

  async [ActionTypes.RESET_PASSWORD]({ commit }, { data }: { data: any }) {
    await this.$axios.$put(`/password-reset/reset-password`, data);
  },
};

export default actions;
