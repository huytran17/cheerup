import ISystemConfiguration from "../../database/interfaces/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";

export type IGetSystemConfiguration = ({
  _id,
}: {
  _id: string;
}) => Promise<ISystemConfiguration>;

export default function makeGetSystemConfiguration({
  systemConfigurationDb,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
}): IGetSystemConfiguration {
  return async function getSystemConfiguration({ _id }) {
    return await systemConfigurationDb.findById({ _id });
  };
}
