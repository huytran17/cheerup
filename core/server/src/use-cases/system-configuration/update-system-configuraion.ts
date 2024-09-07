import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";
import ISystemConfiguration from "../../database/interfaces/system-configuration";

export interface IUpdateSystemConfiguration
  extends Partial<ISystemConfiguration> {}

export type UpdateSystemConfiguration = (
  payload: IUpdateSystemConfiguration
) => Promise<ISystemConfiguration>;

export default function makeUpdateSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): UpdateSystemConfiguration {
  return async function updateSystemConfiguration(payload) {
    return await systemConfigurationDb.update(payload);
  };
}
