import SystemConfiguration from "../../database/entities/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";
import { Logger } from "winston";

export type IGetSystemConfiguration = ({
  _id,
}: {
  _id: string;
}) => Promise<SystemConfiguration | null>;

export default function makeGetSystemConfiguration({
  systemConfigurationDb,
  logger,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
  logger: Logger;
}): IGetSystemConfiguration {
  return async function getSystemConfiguration({
    _id,
  }: {
    _id: string;
  }): Promise<SystemConfiguration | null> {
    const system_configuration = await systemConfigurationDb.findById({ _id });
    return system_configuration;
  };
}
