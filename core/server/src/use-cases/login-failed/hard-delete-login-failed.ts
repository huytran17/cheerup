import ILoginFailedDb from "../../data-access/interfaces/login-failed-db";
import ILoginFailed from "../../database/interfaces/login-failed";

export interface IHardDeleteLoginFailedPayload {
  _id: string;
}

export type HardDeleteLoginFailed = ({
  _id,
}: IHardDeleteLoginFailedPayload) => Promise<ILoginFailed>;

export default function makeHardDeleteLoginFailed({
  loginFailedDb,
}: {
  loginFailedDb: ILoginFailedDb;
}): HardDeleteLoginFailed {
  return async function hardDeleteLoginFailed({ _id }) {
    return await loginFailedDb.hardDelete({ _id });
  };
}
