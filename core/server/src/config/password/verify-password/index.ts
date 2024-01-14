import { CompareHash } from "./make-compare";

interface IHashPasswordData {
  password: string;
  hash_password: string;
  exists?: object;
}
export type VerifyPassword = ({
  password,
  hash_password,
  exists,
}: IHashPasswordData) => Promise<boolean>;

export default function makeVerifyPassword(
  compareHash: CompareHash
): VerifyPassword {
  return async function verifyPassword({ password, hash_password, exists }) {
    if (!password) {
      throw new Error("Password is needed.");
    }

    if (!hash_password) {
      throw new Error(
        `Password confirmation is needed. ${JSON.stringify(exists)}`
      );
    }

    const is_same = await compareHash({ password, hash_password });
    return is_same;
  };
}
