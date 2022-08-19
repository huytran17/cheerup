import { logger } from "../../config/storage/logger";

import { AdminDb } from "../../data-access";

import makeGetAdmin from "./get-admin";
import makeGetAdminByEmail from "./get-admin-by-email";
import makeDeleteAdmin from "./delete-admin";
import makeUpdateAdmin from "./update-admin";
import makeGetAdmins from "./get-admins";
import makeCreateAdmin from "./create-admin";

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
  createAdmin
});

export default adminServices;

export { getAdmin, getAdminByEmail, deleteAdmin, updateAdmin, getAdmins, createAdmin };
