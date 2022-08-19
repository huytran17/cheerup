import getUserRules from "./get-user";
import deleteUserRules from "./delete-user";
import getUserByEmailRules from "./get-user-by-email";
import createUserRules from "./create-user";
import updateUserRules from "./update-user";
import unblockUserCommentRules from "./un-block-user-comment";
import blockUserCommentRules from "./block-user-comment";

export default Object.freeze({
  getUserRules,
  deleteUserRules,
  getUserByEmailRules,
  createUserRules,
  updateUserRules,
  unblockUserCommentRules,
  blockUserCommentRules
});

export {
  getUserRules,
  deleteUserRules,
  getUserByEmailRules,
  createUserRules,
  updateUserRules,
  unblockUserCommentRules,
  blockUserCommentRules
};
