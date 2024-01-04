import { CompareHash } from "./make-compare";

interface IHashPasswordData {
  password: string;
  hash_password: string;
}
export type VerifyPassword = ({
  password,
  hash_password,
}: IHashPasswordData) => Promise<boolean>;

export default function makeVerifyPassword(
  compareHash: CompareHash
): VerifyPassword {
  return async function verifyPassword({ password, hash_password }) {
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
