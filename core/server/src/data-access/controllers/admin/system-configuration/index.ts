import {
  getSystemConfiguration,
  updateSystemConfiguration,
} from "../../../../use-cases/system-configuration";
import { logger } from "../../../../config/storage/logger";

import makeGetSystemConfigurationController from "./get-system-configuration";
import makeUpdateSystemConfigurationController from "./update-system-configuration";

const getSystemConfigurationController = makeGetSystemConfigurationController({
  getSystemConfiguration,
  logger,
});

const updateSystemConfigurationController =
  makeUpdateSystemConfigurationController({
    getSystemConfiguration,
    updateSystemConfiguration,
    logger,
  });

export default Object.freeze({
  getSystemConfigurationController,
  updateSystemConfigurationController,
});

export {
  getSystemConfigurationController,
  updateSystemConfigurationController,
};
