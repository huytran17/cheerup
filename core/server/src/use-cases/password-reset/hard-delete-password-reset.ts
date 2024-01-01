import IPasswordReset from "../../database/interfaces/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";

export type IHardDeletePasswordReset = ({
  _id,
}: {
  _id: string;
}) => Promise<IPasswordReset>;

export default function makeHardDeletePasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): IHardDeletePasswordReset {
  return async function hardDeletePasswordReset({ _id }) {
    return await passwordResetDb.hardDelete({ _id });
  };
}
