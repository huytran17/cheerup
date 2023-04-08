import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { PasswordResetState } from ".";
import { RootState } from "..";
import _ from "lodash";

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
    const { data: password_reset } = await this.$axios.$post(
      `/password-reset`,
      data
    );

    return password_reset;
  },

  async [ActionTypes.RESET_PASSWORD]({ commit }, { data }: { data: any }) {
    const { data: password_reset } = await this.$axios.$put(
      `/password-reset/reset-password`,
      data
    );

    return password_reset;
  },

  async [ActionTypes.HARD_DELETE_PASSWORD_RESET](
    { commit },
    { id }: { id: string }
  ) {
    const { data } = await this.$axios.$delete(
      `/password-reset/hard-delete/${id}`
    );

    return data;
  },
};

export default actions;
