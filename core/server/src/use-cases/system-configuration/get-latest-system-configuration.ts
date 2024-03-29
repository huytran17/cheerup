import ISystemConfiguration from "../../database/interfaces/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export type GetLatestSystemConfiguration = () => Promise<ISystemConfiguration>;

export default function makeGetLatestSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): GetLatestSystemConfiguration {
  return async function getLatestSystemConfiguration() {
    return await systemConfigurationDb.findOne();
  };
}
