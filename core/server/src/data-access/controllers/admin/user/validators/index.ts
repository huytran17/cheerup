import blockUserCommentRules from "./block-user-comment";
import createUserRules from "./create-user";
import deleteUserRules from "./delete-user";
import getUserRules from "./get-user";
import getUserByEmailRules from "./get-user-by-email";
import getUsersPaginatedRules from "./get-users-paginated";
import hardDeleteUserRules from "./hard-delete-user";
import resetUserLoginFailedTimesRules from "./reset-user-login-failed-times";
import restoreUserRules from "./restore-user";
import unblockUserCommentRules from "./un-block-user-comment";
import updateUserRules from "./update-user";
import updateUserPasswordRules from "./update-user-password";
import uploadUserAvatarRules from "./upload-user-avatar";

export default Object.freeze({
  getUserRules,
  deleteUserRules,
  getUserByEmailRules,
  createUserRules,
  updateUserRules,
  unblockUserCommentRules,
  blockUserCommentRules,
  uploadUserAvatarRules,
  updateUserPasswordRules,
  restoreUserRules,
  hardDeleteUserRules,
  resetUserLoginFailedTimesRules,
  getUsersPaginatedRules,
});

export {
  blockUserCommentRules,
  createUserRules,
  deleteUserRules,
  getUserByEmailRules,
  getUserRules,
  getUsersPaginatedRules,
  hardDeleteUserRules,
  resetUserLoginFailedTimesRules,
  restoreUserRules,
  unblockUserCommentRules,
  updateUserPasswordRules,
  updateUserRules,
  uploadUserAvatarRules,
};
