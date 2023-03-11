import ISystemConfiguration from "../../database/interfaces/system-configuration";
import { Logger } from "winston";
import { ICreateSystemConfiguration } from "../../use-cases/system-configuration/create-system-configuration";
import { IGetOneSystemConfiguration } from "../../use-cases/system-configuration/get-one-system-configuration";
import _ from "lodash";
import { isEmpty } from "../../utils/is-empty";

export type IDefaultSystemConfiguration =
  () => Promise<ISystemConfiguration | null>;

export default function makeCreateDefaultSystemConfiguration({
  getOneSystemConfiguration,
  createSystemConfiguration,
  logger,
}: {
  getOneSystemConfiguration: IGetOneSystemConfiguration;
  createSystemConfiguration: ICreateSystemConfiguration;
  logger: Logger;
}): IDefaultSystemConfiguration {
  return async function createDefaultSystemConfiguration(): Promise<ISystemConfiguration | null> {
    const systemConfigurationDetails = {
      is_blocked_comment: false,
      is_maintaining: false,
    };

    const system_configuration = await getOneSystemConfiguration();

    if (!isEmpty(system_configuration)) {
      return;
    }

    await createSystemConfiguration({
      systemConfigurationDetails,
    });

    logger.verbose(`Created default system configuration`);
  };
}
