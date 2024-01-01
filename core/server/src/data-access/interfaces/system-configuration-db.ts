import ISystemConfiguration from "../../database/interfaces/system-configuration";
export default interface ISystemConfigurationDb {
  findById: ({ _id }: { _id: string }) => Promise<ISystemConfiguration>;
  update: (
    updatePayload: Partial<ISystemConfiguration>
  ) => Promise<ISystemConfiguration>;
  findOne: () => Promise<ISystemConfiguration>;
  insert: (
    payload: Partial<ISystemConfiguration>
  ) => Promise<ISystemConfiguration>;
}
