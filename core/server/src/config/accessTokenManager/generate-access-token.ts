import { IJwtGenerate } from "./accessToken";

export type IGenerateAccessToken = (
  payload: { email: string; hash_password: string },
  options?: { expiresIn: string | number }
) => Promise<string>;

export default function makeGenerateAccessToken({
  generate,
  secret,
}: {
  generate: IJwtGenerate;
  secret: string;
}): IGenerateAccessToken {
  return async function generateAccessToken(
    payload: { email: string; hash_password: string },
    options?: { expiresIn: string | number }
  ) {
    const token = generate(payload, secret, options);
    return token;
  };
}
