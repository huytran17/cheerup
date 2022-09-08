import { getLatestSystemConfiguration } from "../../../../use-cases/system-configuration";
import { logger } from "../../../../config/storage/logger";

import makeGetLatestSystemConfigurationController from "./get-latest-system-configuration";

const getLatestSystemConfigurationController =
  makeGetLatestSystemConfigurationController({
    getLatestSystemConfiguration,
    logger,
  });
export default Object.freeze({
  getLatestSystemConfigurationController,
});

export { getLatestSystemConfigurationController };
