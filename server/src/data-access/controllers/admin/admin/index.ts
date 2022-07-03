import {
  getAdmin,
  deleteAdmin,
  updateAdmin,
} from "../../../../use-cases/admin";
import { logger } from "../../../../config/storage/logger";

import makeGetAdminController from "./get-admin";
import makeDeleteAdmin from "./delete-admin";
import makeUpdateAdmin from "./update-admin";

const getAdminController = makeGetAdminController({
  getAdmin,
  logger,
});

const deleteAdminController = makeDeleteAdmin({
  getAdmin,
  deleteAdmin,
  logger,
});

const updateAdminController = makeUpdateAdmin({
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
