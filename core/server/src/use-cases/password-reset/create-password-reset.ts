import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";
import IPasswordReset from "../../database/interfaces/password-reset";

export interface ICreatePasswordResetData {
  passwordResetDetails: Omit<IPasswordReset, "_id" | "created_at">;
}

export type CreatePasswordReset = ({
  passwordResetDetails,
}: ICreatePasswordResetData) => Promise<IPasswordReset>;

export default function makeCreatePasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): CreatePasswordReset {
  return async function createPasswordReset({ passwordResetDetails }) {
    return await passwordResetDb.insert(passwordResetDetails);
  };
}
