import getEmailVerificationRules from "./get-email-verification";
import deleteEmailVerificationRules from "./delete-email-verification";
import createEmailVerificationRules from "./create-email-verification";
import getEmailVerificationByEmailAndVerificationCodeRules from "./get-email-verification-by-email-and-verification-code";
import getEmailVerificationByEmailRules from "./get-email-verification-by-email";

export default Object.freeze({
  getEmailVerificationRules,
  deleteEmailVerificationRules,
  createEmailVerificationRules,
  getEmailVerificationByEmailAndVerificationCodeRules,
  getEmailVerificationByEmailRules,
});

export {
  getEmailVerificationRules,
  deleteEmailVerificationRules,
  createEmailVerificationRules,
  getEmailVerificationByEmailAndVerificationCodeRules,
  getEmailVerificationByEmailRules,
};
