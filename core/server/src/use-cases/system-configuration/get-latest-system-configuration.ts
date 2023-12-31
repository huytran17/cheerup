import SystemConfiguration from "../../database/entities/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export type IGetLatestSystemConfiguration = () => Promise<SystemConfiguration>;

export default function makeGetLatestSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): IGetLatestSystemConfiguration {
  return async function getLatestSystemConfiguration() {
    return await systemConfigurationDb.findOne();
  };
}
