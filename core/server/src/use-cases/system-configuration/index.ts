import { logger } from "../../config/storage/logger";

import { SystemConfigurationDb } from "../../data-access";

import makeGetSystemConfiguration from "./get-system-configuraion";
import makeUpdateSystemConfiguration from "./update-system-configuraion";
import makeGetLatestSystemConfiguration from "./get-latest-system-configuraion";

const getLatestSystemConfiguration = makeGetLatestSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
  logger,
});

const getSystemConfiguration = makeGetSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
  logger,
});

const updateSystemConfiguration = makeUpdateSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
});

const postServices = Object.freeze({
  getSystemConfiguration,
  updateSystemConfiguration,
  getLatestSystemConfiguration,
});

export default postServices;

export {
  getSystemConfiguration,
  updateSystemConfiguration,
  getLatestSystemConfiguration,
};
