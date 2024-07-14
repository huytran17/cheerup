import { logger } from "../../../../config/logs/logger";
import { hashPassword, verifyPassword } from "../../../../config/password";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminAnalystics,
  getAdminByEmail,
  getAdmins,
  getAdminsPaginated,
  getSoftDeletedAdmin,
  hardDeleteAdmin,
  resetLoginFailedTimes,
  updateAdmin,
} from "../../../../use-cases/admin";
import makeCreateAdminController from "./create-admin";
import makeDeleteAdminController from "./delete-admin";
import makeGetAdminController from "./get-admin";
import makeGetAdminAnalysticsController from "./get-admin-analystics";
import makeGetAdminsController from "./get-admins";
import makeGetAdminsPaginatedController from "./get-admins-paginated";
import makeHardDeleteAdminController from "./hard-delete-admin";
import makeResetAdminLoginFailedTimesController from "./reset-admin-login-failed-times";
import makeRestoreAdminController from "./restore-admin";
import makeUpdateAdminController from "./update-admin";
import makeUpdateAdminPasswordController from "./update-admin-password";
import makeUpdateAdminPersonalPasswordController from "./update-admin-personal-password";
import makeUploadAvatarController from "./upload-avatar";

const getAdminsPaginatedController = makeGetAdminsPaginatedController({
  getAdminsPaginated,
});

const resetAdminLoginFailedTimesController =
  makeResetAdminLoginFailedTimesController({
    getAdmin,
    resetLoginFailedTimes,
  });

const updateAdminPersonalPasswordController =
  makeUpdateAdminPersonalPasswordController({
    getAdmin,
    updateAdmin,
    hashPassword,
    verifyPassword,
    logger,
  });

const getAdminAnalysticsController = makeGetAdminAnalysticsController({
  getAdminAnalystics,
});

const uploadAvatarController = makeUploadAvatarController({
  getAdmin,
  updateAdmin,
});

const updateAdminPasswordController = makeUpdateAdminPasswordController({
  getAdmin,
  updateAdmin,
  hashPassword,
  resetLoginFailedTimes,
  logger,
});

const hardDeleteAdminController = makeHardDeleteAdminController({
  getAdmin,
  hardDeleteAdmin,
  logger,
});

const restoreAdminController = makeRestoreAdminController({
  getSoftDeletedAdmin,
  updateAdmin,
  logger,
});

const createAdminController = makeCreateAdminController({
  createAdmin,
  getAdminByEmail,
  hashPassword,
  logger,
});

const getAdminsController = makeGetAdminsController({
  getAdmins,
});

const getAdminController = makeGetAdminController({
  getAdmin,
});

const deleteAdminController = makeDeleteAdminController({
  getAdmin,
  deleteAdmin,
  logger,
});

const updateAdminController = makeUpdateAdminController({
  getAdmin,
  updateAdmin,
  logger,
});

export default Object.freeze({
  getAdminController,
  deleteAdminController,
  updateAdminController,
  getAdminsController,
  createAdminController,
  restoreAdminController,
  hardDeleteAdminController,
  updateAdminPasswordController,
  uploadAvatarController,
  getAdminAnalysticsController,
  updateAdminPersonalPasswordController,
  resetAdminLoginFailedTimesController,
  getAdminsPaginatedController,
});

export {
  createAdminController,
  deleteAdminController,
  getAdminAnalysticsController,
  getAdminController,
  getAdminsController,
  getAdminsPaginatedController,
  hardDeleteAdminController,
  resetAdminLoginFailedTimesController,
  restoreAdminController,
  updateAdminController,
  updateAdminPasswordController,
  updateAdminPersonalPasswordController,
  uploadAvatarController,
};
