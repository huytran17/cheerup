import getAdminRules from "./get-admin";
import deleteAdminRules from "./delete-admin";
import getAdminByEmailRules from "./get-admin-by-email";
import enableAutoCensorshipRules from "./enable-auto-censorship";
import disableAutoCensorshipRules from "./disable-auto-censorship";
import updateAdminRules from "./update-admin";
import createAdminRules from "./create-admin";
import restoreAdminRules from "./restore-admin";
import hardDeleteAdminRules from "./hard-delete-admin";

export default Object.freeze({
  getAdminRules,
  deleteAdminRules,
  getAdminByEmailRules,
  disableAutoCensorshipRules,
  enableAutoCensorshipRules,
  updateAdminRules,
  createAdminRules,
  restoreAdminRules,
  hardDeleteAdminRules
});

export { getAdminRules, deleteAdminRules, getAdminByEmailRules, disableAutoCensorshipRules, enableAutoCensorshipRules, updateAdminRules, createAdminRules, restoreAdminRules, hardDeleteAdminRules };
