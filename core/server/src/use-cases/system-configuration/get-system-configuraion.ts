import ISystemConfiguration from "../../database/interfaces/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export interface IGetSystemConfiguration {
  _id: string;
}

export type GetSystemConfiguration = ({
  _id,
}: IGetSystemConfiguration) => Promise<ISystemConfiguration>;

export default function makeGetSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): GetSystemConfiguration {
  return async function getSystemConfiguration({ _id }) {
    return await systemConfigurationDb.findById({ _id });
  };
}
