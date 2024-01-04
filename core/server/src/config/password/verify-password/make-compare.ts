import bcrypt from "bcrypt";

interface ICompareHashData {
  password: string;
  hash_password: string;
}
export type CompareHash = ({
  password,
  hash_password,
}: ICompareHashData) => Promise<boolean>;

export default function makeCompareHash(): CompareHash {
  return async function compareHash({ password, hash_password }) {
    return await bcrypt.compare(password, hash_password);
  };
}
