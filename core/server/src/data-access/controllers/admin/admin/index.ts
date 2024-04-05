import {
  getAdmin,
  deleteAdmin,
  updateAdmin,
  getAdmins,
  createAdmin,
  getAdminByEmail,
  hardDeleteAdmin,
  getAdminAnalystics,
} from "../../../../use-cases/admin";
import { logger } from "../../../../config/logs/logger";
import { hashPassword, verifyPassword } from "../../../../config/password";

import makeGetAdminController from "./get-admin";
import makeDeleteAdminController from "./delete-admin";
import makeUpdateAdminController from "./update-admin";
import makeGetAdminsController from "./get-admins";
import makeCreateAdminController from "./create-admin";
import makeRestoreAdminController from "./restore-admin";
import makeHardDeleteAdminController from "./hard-delete-admin";
import makeUpdateAdminPasswordController from "./update-admin-password";
import makeUploadAvatarController from "./upload-avatar";
import makeGetAdminAnalysticsController from "./get-admin-analystics";
import makeUpdateAdminPersonalPasswordController from "./update-admin-personal-password";

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
  getAdmin,
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
};
