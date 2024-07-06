import { Logger } from "winston";
import { CreateSystemConfiguration } from "../../use-cases/system-configuration/create-system-configuration";
import { GetLatestSystemConfiguration } from "../../use-cases/system-configuration/get-latest-system-configuration";
import { isEmpty } from "../../utils/is-empty";

export type DefaultSystemConfiguration = () => Promise<void>;

export default function makeCreateDefaultSystemConfiguration({
  getLatestSystemConfiguration,
  createSystemConfiguration,
  logger,
}: {
  getLatestSystemConfiguration: GetLatestSystemConfiguration;
  createSystemConfiguration: CreateSystemConfiguration;
  logger: Logger;
}): DefaultSystemConfiguration {
  return async function createDefaultSystemConfiguration() {
    const system_configuration = await getLatestSystemConfiguration();

    if (!isEmpty(system_configuration)) {
      return;
    }

    const system_configuration_details = {
      is_blocked_comment: false,
    };

    await createSystemConfiguration(system_configuration_details);

    logger.verbose(`Created default system configuration.`);
  };
}
