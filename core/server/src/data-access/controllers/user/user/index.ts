import { logger } from "../../../../config/logs/logger";
import { hashPassword, verifyPassword } from "../../../../config/password";
import { getUser, updateUser } from "../../../../use-cases/user";
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

const updateUserController = makeUpdateUserController({
  updateUser,
  logger,
});

export default Object.freeze({
  updateUserController,
  uploadUserAvatarController,
  updatePasswordController,
});

export {
  updatePasswordController,
  updateUserController,
  uploadUserAvatarController,
};
