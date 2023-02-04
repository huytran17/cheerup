import { logger } from "../../config/logs/logger";
import { redis } from "../../config/redis";

import { AdminDb } from "../../data-access";

import makeGetAdmin from "./get-admin";
import makeGetAdminByEmail from "./get-admin-by-email";
import makeDeleteAdmin from "./delete-admin";
import makeUpdateAdmin from "./update-admin";
import makeGetAdmins from "./get-admins";
import makeCreateAdmin from "./create-admin";
import makeHardDeleteAdmin from "./hard-delete-admin";
import makeGetAdminAnalystics from "./get-admin-analystics";
import makeGetOneAdmin from "./get-one-admin";

const getOneAdmin = makeGetOneAdmin({
  adminDb: AdminDb,
});

const getAdminAnalystics = makeGetAdminAnalystics({
  adminDb: AdminDb,
  redis,
  logger,
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
  getOneAdmin,
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
  getOneAdmin,
};
