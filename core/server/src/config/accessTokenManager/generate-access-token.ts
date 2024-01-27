import { JwtGenerate } from "./accessToken";

export type GenerateAccessToken = (
  payload: { _id: string },
  options?: { expiresIn: string | number }
) => Promise<string>;

export default function makeGenerateAccessToken({
  generate,
  secret,
}: {
  generate: JwtGenerate;
  secret: string;
}): GenerateAccessToken {
  return async function generateAccessToken(payload, options) {
    return generate(payload, secret, options);
  };
}
