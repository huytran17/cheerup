import PasswordReset from "../../database/entities/password-reset";
import IPasswordResetDb from "../../data-access/interfaces/password-reset-db";
import IPasswordReset from "../../database/interfaces/password-reset";

export interface ICreatePasswordResetData {
  passwordResetDetails: Omit<IPasswordReset, "_id" | "created_at">;
}

export type ICreatePasswordReset = ({
  passwordResetDetails,
}: ICreatePasswordResetData) => Promise<PasswordReset | null>;

export default function makeCreatePasswordReset({
  passwordResetDb,
}: {
  passwordResetDb: IPasswordResetDb;
}): ICreatePasswordReset {
  return async function createPasswordReset({
    passwordResetDetails,
  }: ICreatePasswordResetData): Promise<PasswordReset | null> {
    const created = await passwordResetDb.insert(passwordResetDetails);
    return created;
  };
}
