import ISystemConfiguration from "../../database/interfaces/system-configuration";
import SystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export interface ICreateSystemConfigurationPayload
  extends Partial<ISystemConfiguration> {
  [key: string]: any;
}

interface ICreateSystemConfiguration {
  systemConfigurationDetails: ICreateSystemConfigurationPayload;
}

export type CreateSystemConfiguration = ({
  systemConfigurationDetails,
}: ICreateSystemConfiguration) => Promise<ISystemConfiguration>;

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
