import makeGenerateAccessToken from "./generate-access-token";
import makeVerifyAccessToken from "./verify-access-token";
import accessToken from "./accessToken";

const secret = process.env.PASSPORT_JWT_SECRET || "djka0423Adk!28.daTA6LL";

const generateAccessToken = makeGenerateAccessToken({
  generate: accessToken.generate,
  secret,
});

const verifyAccessToken = makeVerifyAccessToken({
  verify: accessToken.verify,
  secret,
});

export default Object.freeze({
  generateAccessToken,
  verifyAccessToken,
});
export { generateAccessToken, verifyAccessToken };
