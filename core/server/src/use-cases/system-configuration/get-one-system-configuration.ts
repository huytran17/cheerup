import SystemConfiguration from "../../database/entities/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export type IGetOneSystemConfiguration = () => Promise<SystemConfiguration>;

export default function makeGetOneSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): IGetOneSystemConfiguration {
  return async function getOneSystemConfiguration() {
    return await systemConfigurationDb.findOne();
  };
}
