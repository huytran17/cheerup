import Randomstring, { GenerateOptions } from "randomstring";

export type RandomString = (options?: GenerateOptions) => string;

const default_options: GenerateOptions = { length: 6, charset: "numeric" };

export default function makeRandomString({
  randomstring,
}: {
  randomstring: typeof Randomstring;
}): RandomString {
  return function randomString(options = {}) {
    return randomstring.generate({ ...default_options, ...options });
  };
}
