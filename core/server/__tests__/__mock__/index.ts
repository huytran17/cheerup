import { faker } from "@faker-js/faker";

import makeFakeUser from "./make-fake-user";

const fakeUser = makeFakeUser({ faker });

export default Object.freeze({
  fakeUser,
});

export { fakeUser };
