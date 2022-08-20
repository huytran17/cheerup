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
import { logger } from "../../../../config/storage/logger";
import { hashPassword } from "../../../../config/password";

import makeGetAdminController from "./get-admin";
import makeDeleteAdminController from "./delete-admin";
import makeUpdateAdminController from "./update-admin";
import makeDisableAutoCensorshipController from "./disable-auto-censorship";
import makeEnableAutoCensorshipController from "./enable-auto-censorship";
import makeGetAdminsController from "./get-admins";
import makeCreateAdminController from "./create-admin";
import makeRestoreAdminController from "./restore-admin";
import makeHardDeleteAdminController from "./hard-delete-admin";
import makeUpdateAdminPasswordController from "./update-admin-password";
import makeUploadAdminAvatarController from "./upload-avatar";
import makeGetAdminAnalysticsController from "./get-admin-analystics";

const getAdminAnalysticsController = makeGetAdminAnalysticsController({
  getAdminAnalystics,
});

const uploadAdminAvatarController = makeUploadAdminAvatarController({
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

const disableAutoCensorshipController = makeDisableAutoCensorshipController({
  getAdmin,
  updateAdmin,
  logger,
});

const enableAutoCensorshipController = makeEnableAutoCensorshipController({
  getAdmin,
  updateAdmin,
  logger,
});

const getAdminController = makeGetAdminController({
  getAdmin,
  logger,
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
  disableAutoCensorshipController,
  enableAutoCensorshipController,
  getAdminsController,
  createAdminController,
  restoreAdminController,
  hardDeleteAdminController,
  updateAdminPasswordController,
  uploadAdminAvatarController,
  getAdminAnalysticsController,
});

export {
  getAdminController,
  deleteAdminController,
  updateAdminController,
  disableAutoCensorshipController,
  enableAutoCensorshipController,
  getAdminsController,
  createAdminController,
  restoreAdminController,
  hardDeleteAdminController,
  updateAdminPasswordController,
  uploadAdminAvatarController,
  getAdminAnalysticsController,
};
