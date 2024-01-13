import { logger } from "../../../../config/logs/logger";
import { hashPassword, verifyPassword } from "../../../../config/password";
import { deleteUser, getUser, updateUser } from "../../../../use-cases/user";
import makeDeleteUserController from "./delete-user";
import makeGetUserController from "./get-user";
import makeUpdatePasswordController from "./update-password";
import makeUpdateUserController from "./update-user";
import makeUploadUserAvatarController from "./upload-avatar";

const updatePasswordController = makeUpdatePasswordController({
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
  deleteUserController,
  getUserController,
  updatePasswordController,
  updateUserController,
  uploadUserAvatarController,
};
