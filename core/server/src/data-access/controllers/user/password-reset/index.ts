import {
  getPasswordReset,
  createPasswordReset,
  hardDeletePasswordReset,
  getByEmailAndCode,
} from "../../../../use-cases/password-reset";

import makeHardDeletePasswordResetController from "./hard-delete-password-reset";
import makeGetPasswordResetByEmailAndCodeController from "./get-password-reset-by-email-and-code";
import makeCreatePasswordResetController from "./create-password-reset";

const createPasswordResetController = makeCreatePasswordResetController({
  createPasswordReset,
});

const hardDeletePasswordResetController = makeHardDeletePasswordResetController(
  {
    getPasswordReset,
    hardDeletePasswordReset,
  }
);

const getPasswordResetByEmailAndCodeController =
  makeGetPasswordResetByEmailAndCodeController({
    getByEmailAndCode,
  });

export default Object.freeze({
  getPasswordResetByEmailAndCodeController,
  hardDeletePasswordResetController,
  createPasswordResetController,
});

export {
  getPasswordResetByEmailAndCodeController,
  hardDeletePasswordResetController,
  createPasswordResetController,
};
