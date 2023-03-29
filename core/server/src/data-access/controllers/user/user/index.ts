import { getUser, deleteUser, updateUser } from "../../../../use-cases/user";
import { logger } from "../../../../config/logs/logger";
import { hashPassword, verifyPassword } from "../../../../config/password";

import makeGetUserController from "./get-user";
import makeDeleteUserController from "./delete-user";
import makeUpdateUserController from "./update-user";
import makeUploadUserAvatarController from "./upload-avatar";
import makeUpdatePasswordController from "./update-password";

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
});

export {
  getUserController,
  deleteUserController,
  updateUserController,
  uploadUserAvatarController,
  updatePasswordController,
};
