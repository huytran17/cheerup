import bcrypt from "bcrypt";
export type IHashFunction = (password: string) => Promise<string>;

export default function makeHash(): IHashFunction {
  return async function hash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };
}
