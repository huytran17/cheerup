import { logger } from "../../../../config/logs/logger";
import { hashPassword } from "../../../../config/password";
import {
  createUser,
  deleteUser,
  getSoftDeletedUser,
  getUser,
  getUserAnalystics,
  getUserByEmail,
  getUsers,
  getUsersPaginated,
  hardDeleteUser,
  resetLoginFailedTimes,
  restoreUser,
  updateUser,
} from "../../../../use-cases/user";
import makeBlockUserCommentController from "./block-user-comment";
import makeCreateUserController from "./create-user";
import makeDeleteUserController from "./delete-user";
import makeGetUserController from "./get-user";
import makeGetUserAnalysticsController from "./get-user-analystics";
import makeGetUserByEmailController from "./get-user-by-email";
import makeGetUsersController from "./get-users";
import makeGetUsersPaginatedController from "./get-users-paginated";
import makeHardDeleteUserController from "./hard-delete-user";
import makeResetUserLoginFailedTimesController from "./reset-user-login-failed-times";
import makeRestoreUserController from "./restore-user";
import makeUnBlockUserCommentController from "./un-block-user-comment";
import makeUpdateUserController from "./update-user";
import makeUpdateUserPasswordController from "./update-user-password";
import makeUploadUserAvatarController from "./upload-avatar";

const getUsersPaginatedController = makeGetUsersPaginatedController({
  getUsersPaginated,
});

const resetUserLoginFailedTimesController =
  makeResetUserLoginFailedTimesController({
    getUser,
    resetLoginFailedTimes,
  });

const getUserAnalysticsController = makeGetUserAnalysticsController({
  getUserAnalystics,
});

const hardDeleteUserController = makeHardDeleteUserController({
  getUser,
  hardDeleteUser,
  logger,
});

const restoreUserController = makeRestoreUserController({
  getSoftDeletedUser,
  restoreUser,
  logger,
});

const updateUserPasswordController = makeUpdateUserPasswordController({
  getUser,
  updateUser,
  hashPassword,
  resetLoginFailedTimes,
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
  resetUserLoginFailedTimesController,
  getUsersPaginatedController,
});

export {
  blockUserCommentController,
  createUserController,
  deleteUserController,
  getUserAnalysticsController,
  getUserByEmailController,
  getUserController,
  getUsersController,
  getUsersPaginatedController,
  hardDeleteUserController,
  resetUserLoginFailedTimesController,
  restoreUserController,
  unblockUserCommentController,
  updateUserController,
  updateUserPasswordController,
  uploadUserAvatarController,
};
