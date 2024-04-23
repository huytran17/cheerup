import Randomstring from "randomstring";

const default_options = { length: 6, charset: "numeric" };

export default function makeRandomString({
  randomstring,
}: {
  randomstring: typeof Randomstring;
}) {
  return function randomString(options?: object) {
    return randomstring.generate({ ...default_options, ...options });
  };
}
