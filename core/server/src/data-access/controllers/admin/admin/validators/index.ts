import getAdminRules from "./get-admin";
import deleteAdminRules from "./delete-admin";
import getAdminByEmailRules from "./get-admin-by-email";
import updateAdminRules from "./update-admin";
import createAdminRules from "./create-admin";
import restoreAdminRules from "./restore-admin";
import hardDeleteAdminRules from "./hard-delete-admin";
import updateAdminPasswordRules from "./update-admin-password";
import uploadAdminAvatarRules from "./upload-admin-avatar";
import updateAdminPersonalPasswordRules from "./update-admin-personal-password";
import getAdminAnalysticsRules from "./get-admin-analystics";

export default Object.freeze({
  getAdminRules,
  deleteAdminRules,
  getAdminByEmailRules,
  updateAdminRules,
  createAdminRules,
  restoreAdminRules,
  hardDeleteAdminRules,
  updateAdminPasswordRules,
  uploadAdminAvatarRules,
  updateAdminPersonalPasswordRules,
  getAdminAnalysticsRules,
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
  uploadAdminAvatarRules,
  updateAdminPersonalPasswordRules,
  getAdminAnalysticsRules,
};
