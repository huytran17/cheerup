import { getUser, deleteUser, updateUser } from "../../../../use-cases/user";
import { getEmailVerificationByEmailAndVerificationCode } from "../../../../use-cases/email-verification";
import { logger } from "../../../../config/logs/logger";
import { hashPassword, verifyPassword } from "../../../../config/password";
import moment from "moment";

import makeGetUserController from "./get-user";
import makeDeleteUserController from "./delete-user";
import makeUpdateUserController from "./update-user";
import makeUploadUserAvatarController from "./upload-avatar";
import makeUpdatePasswordController from "./update-password";
import makeVerifyEmailController from "./verify-email";

const verifyEmailController = makeVerifyEmailController({
  getUser,
  getEmailVerificationByEmailAndVerificationCode,
  updateUser,
  logger,
  moment,
});

const updatePasswordController = makeUpdatePasswordController({
  getUser,
  updateUser,
  hashPassword,
  verifyPassword,
  logger,
});

const uploadUserAvatarController = makeUploadUserAvatarController({
  getUser,
  updateUser,
});

const getUserController = makeGetUserController({
  getUser,
  logger,
});

const deleteUserController = makeDeleteUserController({
  getUser,
  deleteUser,
  logger,
});

const updateUserController = makeUpdateUserController({
  getUser,
  updateUser,
  logger,
});

export default Object.freeze({
  getUserController,
  deleteUserController,
  updateUserController,
  uploadUserAvatarController,
  updatePasswordController,
  verifyEmailController,
});

export {
  getUserController,
  deleteUserController,
  updateUserController,
  uploadUserAvatarController,
  updatePasswordController,
  verifyEmailController,
};
