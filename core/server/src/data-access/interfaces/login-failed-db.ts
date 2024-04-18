import ILoginFailed from "../../database/interfaces/login-failed";

export default interface ILoginFailedDb {
  findByAgent: ({ agent_id }: { agent_id: string }) => Promise<ILoginFailed>;
  insert: ({
    payload,
  }: {
    payload: Partial<ILoginFailed>;
  }) => Promise<ILoginFailed>;
  update: ({
    payload,
  }: {
    payload: Partial<ILoginFailed>;
  }) => Promise<ILoginFailed>;
  hardDelete: ({ _id }: { _id: string }) => Promise<ILoginFailed>;
}
