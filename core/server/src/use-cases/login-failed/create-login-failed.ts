import ILoginFailedDb from "../../data-access/interfaces/login-failed-db";
import ILoginFailed from "../../database/interfaces/login-failed";

export interface ICreateLoginFailedPayload extends Partial<ILoginFailed> {}

export type CreateLoginFailed = (
  payload: ICreateLoginFailedPayload
) => Promise<ILoginFailed>;

export default function makeCreateLoginFailed({
  loginFailedDb,
}: {
  loginFailedDb: ILoginFailedDb;
}): CreateLoginFailed {
  return async function createLoginFailed(payload) {
    return await loginFailedDb.insert(payload);
  };
}
