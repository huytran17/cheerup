import { logger } from "../../config/logs/logger";

import { SystemConfigurationDb } from "../../data-access";

import makeGetSystemConfiguration from "./get-system-configuraion";
import makeUpdateSystemConfiguration from "./update-system-configuraion";
import makeGetLatestSystemConfiguration from "./get-latest-system-configuration";
import makeCreateSystemConfiguration from "./create-system-configuration";
import makeGetOneSystemConfiguration from "./get-one-system-configuration";

const createSystemConfiguration = makeCreateSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
});

const getOneSystemConfiguration = makeGetOneSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
});

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

const systemConfigurationServices = Object.freeze({
  getSystemConfiguration,
  updateSystemConfiguration,
  getLatestSystemConfiguration,
  getOneSystemConfiguration,
  createSystemConfiguration,
});

export default systemConfigurationServices;

export {
  getSystemConfiguration,
  updateSystemConfiguration,
  getLatestSystemConfiguration,
  getOneSystemConfiguration,
  createSystemConfiguration,
};
