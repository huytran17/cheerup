import ISystemConfiguration from "../../database/interfaces/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export type GetOneSystemConfiguration = () => Promise<ISystemConfiguration>;

export default function makeGetOneSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): GetOneSystemConfiguration {
  return async function getOneSystemConfiguration() {
    return await systemConfigurationDb.findOne();
  };
}
