import { hashPassword } from "../../config/password";
import { getOneAdmin, createAdmin } from "../../use-cases/admin";
import { logger } from "../../config/logs/logger";
import {
  getLatestSystemConfiguration,
  createSystemConfiguration,
} from "../../use-cases/system-configuration";

import makeCreateDefaultAdmin from "./make-default-admin";
import makeCreateDefaultSystemConfiguration from "./make-default-system-configuration";

const createDefaultSystemConfiguration = makeCreateDefaultSystemConfiguration({
  getLatestSystemConfiguration,
  createSystemConfiguration,
  logger,
});

const createDefaultAdmin = makeCreateDefaultAdmin({
  getOneAdmin,
  hashPassword,
  createAdmin,
  logger,
});

export default Object.freeze({
  createDefaultAdmin,
  createDefaultSystemConfiguration,
});

export { createDefaultAdmin, createDefaultSystemConfiguration };
