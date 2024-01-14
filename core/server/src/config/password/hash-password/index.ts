import { HashFunction } from "./make-hash";

interface IHashPasswordData {
  password: string;
  password_confirmation: string;
}
export type HashPassword = ({
  password,
  password_confirmation,
}: IHashPasswordData) => Promise<string>;

export default function makeHashPassword(hash: HashFunction): HashPassword {
  return async function hashPassword({ password, password_confirmation }) {
    if (!password) {
      throw new Error("Password is needed.");
    }

    if (!password_confirmation) {
      throw new Error("Password confirmation is needed.");
    }

    if (password !== password_confirmation) {
      throw new Error("Password and password confirmation does not match.");
    }

    const hashed_password = await hash(password);
    return hashed_password;
  };
}
