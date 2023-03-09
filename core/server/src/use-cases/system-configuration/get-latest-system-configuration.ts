import SystemConfiguration from "../../database/entities/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";
import { Logger } from "winston";

export type IGetLatestSystemConfiguration =
  () => Promise<SystemConfiguration | null>;

export default function makeGetLatestSystemConfiguration({
  systemConfigurationDb,
  logger,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
  logger: Logger;
}): IGetLatestSystemConfiguration {
  return async function getLatestSystemConfiguration(): Promise<SystemConfiguration | null> {
    const system_configuration = await systemConfigurationDb.findOne();
    return system_configuration;
  };
}
