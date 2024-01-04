import bcrypt from "bcrypt";
export type HashFunction = (password: string) => Promise<string>;

export default function makeHash(): HashFunction {
  return async function hash(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };
}
