import { faker } from "@faker-js/faker";

import makeFakeUser from "./make-fake-user";
import makeFakeAdmin from "./make-fake-admin";

const fakeUser = makeFakeUser({ faker });
const fakeAdmin = makeFakeAdmin({ faker });

export default Object.freeze({
  fakeUser,
  fakeAdmin,
});

export { fakeUser, fakeAdmin };
