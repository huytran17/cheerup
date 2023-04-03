import { PasswordResetDb } from "../../data-access";
import makeGetByEmailAndCode from "./get-by-email-and-code";
import makeCreatePasswordReset from "./create-password-reset";
import makeHardDeletePasswordReset from "./hard-delete-password-reset";
import makeGetPasswordReset from "./get-password-reset";

const getPasswordReset = makeGetPasswordReset({
  passwordResetDb: PasswordResetDb,
});

const hardDeletePasswordReset = makeHardDeletePasswordReset({
  passwordResetDb: PasswordResetDb,
});

const getByEmailAndCode = makeGetByEmailAndCode({
  passwordResetDb: PasswordResetDb,
});

const createPasswordReset = makeCreatePasswordReset({
  passwordResetDb: PasswordResetDb,
});

const passwordResetServices = Object.freeze({
  getByEmailAndCode,
  createPasswordReset,
  hardDeletePasswordReset,
  getPasswordReset,
});

export default passwordResetServices;

export {
  getByEmailAndCode,
  createPasswordReset,
  hardDeletePasswordReset,
  getPasswordReset,
};
