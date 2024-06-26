import { getLatestSystemConfiguration } from "../../../../use-cases/system-configuration";
import makeGetLatestSystemConfigurationController from "./get-latest-system-configuration";

const getLatestSystemConfigurationController =
  makeGetLatestSystemConfigurationController({
    getLatestSystemConfiguration,
  });
export default Object.freeze({
  getLatestSystemConfigurationController,
});

export { getLatestSystemConfigurationController };
