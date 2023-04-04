import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { PasswordResetState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<PasswordResetState, RootState> = {
  async [ActionTypes.GET_PASSWORD_RESET_BY_EMAIL_AND_CODE](
    { commit },
    { email, security_code }: { email: string; security_code: string }
  ) {
    const url_query = new URLSearchParams();

    email && url_query.set("email", email);

    security_code && url_query.set("security_code", security_code);

    const { data } = await this.$axios.$get(`/password-reset?${url_query}`);

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
