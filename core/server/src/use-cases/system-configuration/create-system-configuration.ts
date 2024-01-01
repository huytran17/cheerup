import ISystemConfiguration from "../../database/interfaces/system-configuration";
import SystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export interface ICreateSystemConfigurationData {
  systemConfigurationDetails: Omit<
    ISystemConfiguration,
    "_id" | "created_at" | "updated_at" | "deleted_at"
  >;
}

export type CreateSystemConfiguration = ({
  systemConfigurationDetails,
}: ICreateSystemConfigurationData) => Promise<ISystemConfiguration>;

export default function makeCreateSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: SystemConfigurationDb;
}): CreateSystemConfiguration {
  return async function createSystemConfiguration({
    systemConfigurationDetails,
  }) {
    return await systemConfigurationDb.insert(systemConfigurationDetails);
  };
}
