import { GetterTree } from "vuex";
import { EmailVerificationState } from ".";
import { RootState } from "..";

export const getters: GetterTree<EmailVerificationState, RootState> = {
  prefix() {
    return "/email-verification";
  },
  verification_code: (state) => state.verification_code,
  email_verification: (state) => state.email_verification,
};

export default getters;
