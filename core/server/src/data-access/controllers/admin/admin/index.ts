import {
  getAdmin,
  deleteAdmin,
  updateAdmin,
} from "../../../../use-cases/admin";
import { logger } from "../../../../config/storage/logger";

import makeGetAdminController from "./get-admin";
import makeDeleteAdminController from "./delete-admin";
import makeUpdateAdminController from "./update-admin";

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
});

export { getAdminController, deleteAdminController, updateAdminController };
