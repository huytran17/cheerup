import SystemConfiguration from "../../database/entities/system-configuration";
import ISystemConfiguration from "../../database/interfaces/system-configuration";
import SystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export interface ICreateSystemConfigurationData {
  systemConfigurationDetails: Omit<
    ISystemConfiguration,
    "_id" | "created_at" | "updated_at" | "deleted_at"
  >;
}

export type ICreateSystemConfiguration = ({
  systemConfigurationDetails,
}: ICreateSystemConfigurationData) => Promise<SystemConfiguration | null>;

export default function makeCreateSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: SystemConfigurationDb;
}): ICreateSystemConfiguration {
  return async function createSystemConfiguration({
    systemConfigurationDetails,
  }) {
    return await systemConfigurationDb.insert(systemConfigurationDetails);
  };
}
