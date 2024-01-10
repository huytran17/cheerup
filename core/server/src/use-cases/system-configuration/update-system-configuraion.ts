import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";
import ISystemConfiguration from "../../database/interfaces/system-configuration";

export interface IUpdateSystemConfigurationPayload
  extends Partial<ISystemConfiguration> {}

interface IUpdateSystemConfiguration {
  systemConfigurationDetails: IUpdateSystemConfigurationPayload;
}

export type UpdateSystemConfiguration = ({
  systemConfigurationDetails,
}: IUpdateSystemConfiguration) => Promise<ISystemConfiguration>;

export default function makeUpdateSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): UpdateSystemConfiguration {
  return async function updateSystemConfiguration({
    systemConfigurationDetails,
  }) {
    return await systemConfigurationDb.update(systemConfigurationDetails);
  };
}
