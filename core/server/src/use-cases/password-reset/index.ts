import { PasswordResetDb } from "../../data-access";
import makeGetPasswordResetByCode from "./get-password-reset-by-code";
import makeCreatePasswordReset from "./create-password-reset";
import makeHardDeletePasswordReset from "./hard-delete-password-reset";
import makeGetPasswordReset from "./get-password-reset";
import makeGetPasswordResetByEmail from "./get-password-reset-by-email";

const getPasswordResetByEmail = makeGetPasswordResetByEmail({
  passwordResetDb: PasswordResetDb,
});

const getPasswordReset = makeGetPasswordReset({
  passwordResetDb: PasswordResetDb,
});

const hardDeletePasswordReset = makeHardDeletePasswordReset({
  passwordResetDb: PasswordResetDb,
});

const getPasswordResetByCode = makeGetPasswordResetByCode({
  passwordResetDb: PasswordResetDb,
});

const createPasswordReset = makeCreatePasswordReset({
  passwordResetDb: PasswordResetDb,
});

const passwordResetServices = Object.freeze({
  getPasswordResetByCode,
  createPasswordReset,
  hardDeletePasswordReset,
  getPasswordReset,
  getPasswordResetByEmail,
});

export default passwordResetServices;

export {
  getPasswordResetByCode,
  createPasswordReset,
  hardDeletePasswordReset,
  getPasswordReset,
  getPasswordResetByEmail,
};
