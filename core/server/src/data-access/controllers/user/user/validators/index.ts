import getUserRules from "./get-user";
import deleteUserRules from "./delete-user";
import updateUserRules from "./update-user";
import updatePasswordRules from "./update-password";
import uploadUserAvatarRules from "./upload-user-avatar";
import verifyEmailRules from "./verify-email";

export default Object.freeze({
  getUserRules,
  deleteUserRules,
  updateUserRules,
  uploadUserAvatarRules,
  updatePasswordRules,
  verifyEmailRules,
});

export {
  getUserRules,
  deleteUserRules,
  updateUserRules,
  uploadUserAvatarRules,
  updatePasswordRules,
  verifyEmailRules,
};
