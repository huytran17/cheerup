import { logger } from "../../config/logs/logger";
import { randomCacheTime } from "../../config/random-cache-time";
import { redis } from "../../config/redis";
import { AdminDb } from "../../data-access";
import makeBatchUploadAdmins from "./batch-upload-admins";
import makeCreateAdmin from "./create-admin";
import makeDeleteAdmin from "./delete-admin";
import makeGetAdmin from "./get-admin";
import makeGetAdminAnalystics from "./get-admin-analystics";
import makeGetAdminByEmail from "./get-admin-by-email";
import makeGetAdmins from "./get-admins";
import makeGetAdminsPaginated from "./get-admins-paginated";
import makeGetOneAdmin from "./get-one-admin";
import makeGetSoftDeletedAdmin from "./get-soft-deleted-admin";
import makeHardDeleteAdmin from "./hard-delete-admin";
import makeIncreaseLoginFailedTimes from "./increase-login-failed-times";
import makeResetLoginFailedTimes from "./reset-login-failed-times";
import makeUpdateAdmin from "./update-admin";

const getAdminsPaginated = makeGetAdminsPaginated({
  adminDb: AdminDb,
  randomCacheTime,
  redis,
  logger,
});

const batchUploadAdmins = makeBatchUploadAdmins({
  adminDb: AdminDb,
});

const increaseLoginFailedTimes = makeIncreaseLoginFailedTimes({
  adminDb: AdminDb,
});

const resetLoginFailedTimes = makeResetLoginFailedTimes({
  adminDb: AdminDb,
});

const getSoftDeletedAdmin = makeGetSoftDeletedAdmin({
  adminDb: AdminDb,
});

const getOneAdmin = makeGetOneAdmin({
  adminDb: AdminDb,
});

const getAdminAnalystics = makeGetAdminAnalystics({
  adminDb: AdminDb,
  randomCacheTime,
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
  randomCacheTime,
  redis,
  logger,
});

const getAdmin = makeGetAdmin({
  adminDb: AdminDb,
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
  getSoftDeletedAdmin,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
  batchUploadAdmins,
  getAdminsPaginated,
});

export default adminServices;

export {
  batchUploadAdmins,
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminAnalystics,
  getAdminByEmail,
  getAdmins,
  getAdminsPaginated,
  getOneAdmin,
  getSoftDeletedAdmin,
  hardDeleteAdmin,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
  updateAdmin,
};
