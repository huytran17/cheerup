import {
  getUser,
  deleteUser,
  updateUser,
  getUsers,
  getUserByEmail,
  hardDeleteUser,
  getUserAnalystics,
  createUser,
  restoreUser,
} from "../../../../use-cases/user";
import { logger } from "../../../../config/logs/logger";
import { hashPassword } from "../../../../config/password";

import makeGetUserController from "./get-user";
import makeDeleteUserController from "./delete-user";
import makeUpdateUserController from "./update-user";
import makeCreateUserController from "./create-user";
import makeGetUserByEmailController from "./get-user-by-email";
import makeGetUsersController from "./get-users";
import makeBlockUserCommentController from "./block-user-comment";
import makeUnBlockUserCommentController from "./un-block-user-comment";
import makeUploadUserAvatarController from "./upload-avatar";
import makeUpdateUserPasswordController from "./update-user-password";
import makeRestoreUserController from "./restore-user";
import makeHardDeleteUserController from "./hard-delete-user";
import makeGetUserAnalysticsController from "./get-user-analystics";

const getUserAnalysticsController = makeGetUserAnalysticsController({
  getUserAnalystics,
});

const hardDeleteUserController = makeHardDeleteUserController({
  getUser,
  hardDeleteUser,
  logger,
});

const restoreUserController = makeRestoreUserController({
  getUser,
  restoreUser,
  logger,
});

const updateUserPasswordController = makeUpdateUserPasswordController({
  getUser,
  updateUser,
  hashPassword,
  logger,
});

const uploadUserAvatarController = makeUploadUserAvatarController({
  getUser,
  updateUser,
});

const blockUserCommentController = makeBlockUserCommentController({
  getUser,
  updateUser,
  logger,
});

const unblockUserCommentController = makeUnBlockUserCommentController({
  getUser,
  updateUser,
  logger,
});

const createUserController = makeCreateUserController({
  createUser,
  getUserByEmail,
  hashPassword,
  logger,
});

const getUserByEmailController = makeGetUserByEmailController({
  getUserByEmail,
});

const getUsersController = makeGetUsersController({
  getUsers,
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
  getUserByEmailController,
  getUsersController,
  createUserController,
  blockUserCommentController,
  unblockUserCommentController,
  uploadUserAvatarController,
  updateUserPasswordController,
  restoreUserController,
  hardDeleteUserController,
  getUserAnalysticsController,
});

export {
  getUserController,
  deleteUserController,
  updateUserController,
  getUserByEmailController,
  getUsersController,
  createUserController,
  blockUserCommentController,
  unblockUserCommentController,
  uploadUserAvatarController,
  updateUserPasswordController,
  restoreUserController,
  hardDeleteUserController,
  getUserAnalysticsController,
};
