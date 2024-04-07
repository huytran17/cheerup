import { logger } from "../../../../config/logs/logger";
import { hashPassword, verifyPassword } from "../../../../config/password";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminAnalystics,
  getAdminByEmail,
  getAdmins,
  getSoftDeletedAdmin,
  hardDeleteAdmin,
  updateAdmin,
} from "../../../../use-cases/admin";
import makeCreateAdminController from "./create-admin";
import makeDeleteAdminController from "./delete-admin";
import makeGetAdminController from "./get-admin";
import makeGetAdminAnalysticsController from "./get-admin-analystics";
import makeGetAdminsController from "./get-admins";
import makeHardDeleteAdminController from "./hard-delete-admin";
import makeRestoreAdminController from "./restore-admin";
import makeUpdateAdminController from "./update-admin";
import makeUpdateAdminPasswordController from "./update-admin-password";
import makeUpdateAdminPersonalPasswordController from "./update-admin-personal-password";
import makeUploadAvatarController from "./upload-avatar";

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
});

export {
  createAdminController,
  deleteAdminController,
  getAdminAnalysticsController,
  getAdminController,
  getAdminsController,
  hardDeleteAdminController,
  restoreAdminController,
  updateAdminController,
  updateAdminPasswordController,
  updateAdminPersonalPasswordController,
  uploadAvatarController,
};
