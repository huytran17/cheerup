import getAdminRules from "./get-admin";
import deleteAdminRules from "./delete-admin";
import getAdminByEmailRules from "./get-admin-by-email";
import enableAutoCensorshipRules from "./enable-auto-censorship";
import disableAutoCensorshipRules from "./disable-auto-censorship";
import updateAdminRules from "./update-admin";
import createAdminRules from "./create-admin";

export default Object.freeze({
  getAdminRules,
  deleteAdminRules,
  getAdminByEmailRules,
  disableAutoCensorshipRules,
  enableAutoCensorshipRules,
  updateAdminRules,
  createAdminRules
});

export { getAdminRules, deleteAdminRules, getAdminByEmailRules, disableAutoCensorshipRules, enableAutoCensorshipRules, updateAdminRules, createAdminRules };
