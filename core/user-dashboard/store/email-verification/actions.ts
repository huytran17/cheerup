import { ActionTree } from "vuex";
import { EmailVerificationState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<EmailVerificationState, RootState> = {
  async [ActionTypes.SEND_VERIFICATION_CODE]({ commit }) {
    const { data: email_verification } = await this.$axios.$get(
      "/email-verification/send-verification-code"
    );

    commit(MutationTypes.SET_EMAIL_VERIFICATION, { data: email_verification });
    return email_verification;
  },
};

export default actions;
