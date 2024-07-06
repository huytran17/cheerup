import { SystemConfigurationDb } from "../../data-access";
import makeCreateSystemConfiguration from "./create-system-configuration";
import makeGetLatestSystemConfiguration from "./get-latest-system-configuration";
import makeGetSystemConfiguration from "./get-system-configuraion";
import makeUpdateSystemConfiguration from "./update-system-configuraion";

const createSystemConfiguration = makeCreateSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
});

const getLatestSystemConfiguration = makeGetLatestSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
});

const getSystemConfiguration = makeGetSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
});

const updateSystemConfiguration = makeUpdateSystemConfiguration({
  systemConfigurationDb: SystemConfigurationDb,
});

const systemConfigurationServices = Object.freeze({
  getSystemConfiguration,
  updateSystemConfiguration,
  getLatestSystemConfiguration,
  createSystemConfiguration,
});

export default systemConfigurationServices;

export {
  createSystemConfiguration,
  getLatestSystemConfiguration,
  getSystemConfiguration,
  updateSystemConfiguration,
};
