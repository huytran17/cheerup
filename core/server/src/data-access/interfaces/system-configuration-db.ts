import SystemConfiguration from "../../database/entities/system-configuration";
import ISystemConfiguration from "../../database/interfaces/system-configuration";
export default interface ISystemConfigurationDb {
  findById: ({ _id }: { _id: string }) => Promise<SystemConfiguration | null>;
  update: (
    updatePayload: Partial<ISystemConfiguration>
  ) => Promise<SystemConfiguration | null>;
  findOne: () => Promise<SystemConfiguration | null>;
  insert: (
    payload: Partial<ISystemConfiguration>
  ) => Promise<SystemConfiguration | null>;
}
