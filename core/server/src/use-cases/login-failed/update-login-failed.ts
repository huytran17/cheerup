import ILoginFailedDb from "../../data-access/interfaces/login-failed-db";
import ILoginFailed from "../../database/interfaces/login-failed";

export interface IUpdateLoginFailedPayload extends Partial<ILoginFailed> {}

export type UpdateLoginFailed = (
  payload: IUpdateLoginFailedPayload
) => Promise<ILoginFailed>;

export default function makeUpdateLoginFailed({
  loginFailedDb,
}: {
  loginFailedDb: ILoginFailedDb;
}): UpdateLoginFailed {
  return async function updateLoginFailed(payload) {
    return await loginFailedDb.update(payload);
  };
}
