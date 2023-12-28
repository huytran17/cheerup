import bcrypt from "bcrypt";

interface ICompareHashData {
  password: string;
  hash_password: string;
}
export type ICompareHash = ({
  password,
  hash_password,
}: ICompareHashData) => Promise<boolean>;

export default function makeCompareHash(): ICompareHash {
  return async function compareHash({
    password,
    hash_password,
  }): Promise<boolean> {
    return await bcrypt.compare(password, hash_password);
  };
}
