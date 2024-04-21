import getUserRules from "./get-user";
import deleteUserRules from "./delete-user";
import getUserByEmailRules from "./get-user-by-email";
import createUserRules from "./create-user";
import updateUserRules from "./update-user";
import unblockUserCommentRules from "./un-block-user-comment";
import blockUserCommentRules from "./block-user-comment";
import uploadUserAvatarRules from "./upload-user-avatar";
import updateUserPasswordRules from "./update-user-password";
import restoreUserRules from "./restore-user";
import hardDeleteUserRules from "./hard-delete-user";
import resetUserLoginFailedTimesRules from "./reset-user-login-failed-times";

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
});

export {
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
};
