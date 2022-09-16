import { logger } from "../../config/logs/logger";

import { AdminDb } from "../../data-access";

import makeGetAdmin from "./get-admin";
import makeGetAdminByEmail from "./get-admin-by-email";
import makeDeleteAdmin from "./delete-admin";
import makeUpdateAdmin from "./update-admin";
import makeGetAdmins from "./get-admins";
import makeCreateAdmin from "./create-admin";
import makeHardDeleteAdmin from "./hard-delete-admin";
import makeGetAdminAnalystics from "./get-admin-analystics";

const getAdminAnalystics = makeGetAdminAnalystics({
  adminDb: AdminDb,
});

const hardDeleteAdmin = makeHardDeleteAdmin({
  adminDb: AdminDb,
});

const createAdmin = makeCreateAdmin({
  adminDb: AdminDb,
});

const getAdmins = makeGetAdmins({
  adminDb: AdminDb,
  logger,
});

const getAdmin = makeGetAdmin({
  adminDb: AdminDb,
  logger,
});

const getAdminByEmail = makeGetAdminByEmail({
  adminDb: AdminDb,
});

const deleteAdmin = makeDeleteAdmin({
  adminDb: AdminDb,
});

const updateAdmin = makeUpdateAdmin({
  adminDb: AdminDb,
});

const adminServices = Object.freeze({
  getAdmin,
  getAdminByEmail,
  deleteAdmin,
  updateAdmin,
  getAdmins,
  createAdmin,
  hardDeleteAdmin,
  getAdminAnalystics,
});

export default adminServices;

export {
  getAdmin,
  getAdminByEmail,
  deleteAdmin,
  updateAdmin,
  getAdmins,
  createAdmin,
  hardDeleteAdmin,
  getAdminAnalystics,
};
