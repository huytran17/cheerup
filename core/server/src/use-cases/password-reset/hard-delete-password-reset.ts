import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export interface IHardDeletePasswordResetPayload {
  _id: string;
}

export type HardDeletePasswordReset = ({
  _id,
}: IHardDeletePasswordResetPayload) => Promise<IPasswordReset>;

export default function makeHardDeletePasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): HardDeletePasswordReset {
  return async function hardDeletePasswordReset({ _id }) {
    return await passwordResetDb.hardDelete({ _id });
  };
}
