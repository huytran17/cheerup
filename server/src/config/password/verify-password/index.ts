import { ICompareHash } from "./make-compare";

interface IHashPasswordData {
  password: string;
  hash_password: string;
}
export type IVerifyPassword = ({
  password,
  hash_password,
}: IHashPasswordData) => Promise<boolean>;

export default function makeVerifyPassword(
  compareHash: ICompareHash
): IVerifyPassword {
  return async function verifyPassword({
    password,
    hash_password,
  }: IHashPasswordData): Promise<boolean> {
    if (!password) {
      throw new Error("Password is needed.");
    }

    if (!hash_password) {
      throw new Error("confirm password is needed.");
    }

    const is_same = await compareHash({ password, hash_password });
    return is_same;
  };
}
