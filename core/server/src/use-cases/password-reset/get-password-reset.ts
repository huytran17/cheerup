import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export interface IGetPasswordResetPayload {
  _id: string;
}

export type GetPasswordReset = ({
  _id,
}: IGetPasswordResetPayload) => Promise<IPasswordReset>;

export default function makeGetPasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): GetPasswordReset {
  return async function getPasswordReset({ _id }) {
    return await passwordResetDb.findById({ _id });
  };
}
