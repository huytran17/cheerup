import ISystemConfiguration from "../../database/interfaces/system-configuration";
import SystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export interface ICreateSystemConfiguration
  extends Partial<ISystemConfiguration> {
  [key: string]: any;
}

export type CreateSystemConfiguration = (
  payload: ICreateSystemConfiguration
) => Promise<ISystemConfiguration>;

export default function makeCreateSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: SystemConfigurationDb;
}): CreateSystemConfiguration {
  return async function createSystemConfiguration(payload) {
    return await systemConfigurationDb.insert(payload);
  };
}
