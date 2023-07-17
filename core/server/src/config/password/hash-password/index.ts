import { IHashFunction } from "./make-hash";

interface IHashPasswordData {
  password: string;
  password_confirmation: string;
}
export type IHashPassword = ({
  password,
  password_confirmation,
}: IHashPasswordData) => Promise<string>;

export default function makeHashPassword(hash: IHashFunction): IHashPassword {
  return async function hashPassword({
    password,
    password_confirmation,
  }: IHashPasswordData): Promise<string> {
    if (!password) {
      throw new Error("Password is needed.");
    }

    if (!password_confirmation) {
      throw new Error("Confirm password is needed.");
    }

    if (password !== password_confirmation) {
      throw new Error("Password and confirm password does not match.");
    }

    const hashed_password = await hash(password);
    return hashed_password;
  };
}
