import getAdminRules from "./get-admin";
import deleteAdminRules from "./delete-admin";
import getAdminByEmailRules from "./get-admin-by-email";
import enableAutoCensorshipRules from "./enable-auto-censorship";
import disableAutoCensorshipRules from "./disable-auto-censorship";
import updateAdminRules from "./update-admin";
import createAdminRules from "./create-admin";
import restoreAdminRules from "./restore-admin";
import hardDeleteAdminRules from "./hard-delete-admin";
import updateAdminPasswordRules from "./update-admin-password";
import uploadAdminAvatarRules from "./upload-admin-avatar";

export default Object.freeze({
  getAdminRules,
  deleteAdminRules,
  getAdminByEmailRules,
  disableAutoCensorshipRules,
  enableAutoCensorshipRules,
  updateAdminRules,
  createAdminRules,
  restoreAdminRules,
  hardDeleteAdminRules,
  updateAdminPasswordRules,
  uploadAdminAvatarRules,
});

export {
  getAdminRules,
  deleteAdminRules,
  updateAdminPasswordRules,
  getAdminByEmailRules,
  disableAutoCensorshipRules,
  enableAutoCensorshipRules,
  updateAdminRules,
  createAdminRules,
  restoreAdminRules,
  hardDeleteAdminRules,
  uploadAdminAvatarRules,
};
