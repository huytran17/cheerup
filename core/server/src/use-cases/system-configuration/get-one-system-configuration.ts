import ISystemConfiguration from "../../database/interfaces/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export type IGetOneSystemConfiguration = () => Promise<ISystemConfiguration>;

export default function makeGetOneSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): IGetOneSystemConfiguration {
  return async function getOneSystemConfiguration() {
    return await systemConfigurationDb.findOne();
  };
}
