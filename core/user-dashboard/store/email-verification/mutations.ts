import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { EmailVerificationState } from ".";
import _ from "lodash";

const mutations: MutationTree<EmailVerificationState> = {
  [MutationTypes.SET_EMAIL_VERIFICATION](state, { data }: { data: any }) {
    state.email_verification = data;
  },

  [MutationTypes.SET_VERIFICATION_CODE](state, { data }: { data: string }) {
    state.verification_code = data;
  },
};

export default mutations;
