import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { SystemConfigurationDb } from "../../data-access";

import makeGetSystemConfiguration from "./get-system-configuraion";
import makeUpdateSystemConfiguration from "./update-system-configuraion";

const getSystemConfiguration = makeGetSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
  redis,
  logger,
});

const updateSystemConfiguration = makeUpdateSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
});

const postServices = Object.freeze({
  getSystemConfiguration,
  updateSystemConfiguration,
});

export default postServices;

export { getSystemConfiguration, updateSystemConfiguration };
