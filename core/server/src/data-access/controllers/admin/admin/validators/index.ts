import getAdminRules from "./get-admin";
import deleteAdminRules from "./delete-admin";
import getAdminByEmailRules from "./get-admin-by-email";
import updateAdminRules from "./update-admin";
import createAdminRules from "./create-admin";
import restoreAdminRules from "./restore-admin";
import hardDeleteAdminRules from "./hard-delete-admin";
import updateAdminPasswordRules from "./update-admin-password";
import uploadAvatarRules from "./upload-avatar";
import updateAdminPersonalPasswordRules from "./update-admin-personal-password";
import getAdminAnalysticsRules from "./get-admin-analystics";
import resetAdminLoginFailedTimesRules from "./reset-admin-login-failed-times";

export default Object.freeze({
  getAdminRules,
  deleteAdminRules,
  getAdminByEmailRules,
  updateAdminRules,
  createAdminRules,
  restoreAdminRules,
  hardDeleteAdminRules,
  updateAdminPasswordRules,
  uploadAvatarRules,
  updateAdminPersonalPasswordRules,
  getAdminAnalysticsRules,
  resetAdminLoginFailedTimesRules,
});

export {
  getAdminRules,
  deleteAdminRules,
  updateAdminPasswordRules,
  getAdminByEmailRules,
  updateAdminRules,
  createAdminRules,
  restoreAdminRules,
  hardDeleteAdminRules,
  uploadAvatarRules,
  updateAdminPersonalPasswordRules,
  getAdminAnalysticsRules,
  resetAdminLoginFailedTimesRules,
};
