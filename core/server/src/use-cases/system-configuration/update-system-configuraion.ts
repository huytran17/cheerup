import SystemConfiguration from "../../database/entities/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";
import ISystemConfiguration from "../../database/interfaces/system-configuration";

export interface IUpdateSystemConfigurationData {
  systemConfigurationDetails: Omit<ISystemConfiguration, "_id">;
}

export type IUpdateSystemConfiguration = ({
  systemConfigurationDetails,
}: IUpdateSystemConfigurationData) => Promise<SystemConfiguration | null>;

export default function makeUpdateSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): IUpdateSystemConfiguration {
  return async function updateSystemConfiguration({
    systemConfigurationDetails,
  }) {
    return await systemConfigurationDb.update(systemConfigurationDetails);
  };
}
