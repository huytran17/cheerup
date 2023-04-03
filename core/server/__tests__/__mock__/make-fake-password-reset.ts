import IPasswordReset from "../../src/database/interfaces/password-reset";

export type FakePasswordReset = () => IPasswordReset;

export default function makeFakePasswordReset({
  faker,
}: {
  faker: any;
}): FakePasswordReset {
  return function fakePasswordReset(): IPasswordReset {
    return {
      _id: faker.database.mongodbObjectId(),
      email: faker.internet.email(),
      security_code: faker.random.word(),
      created_at: faker.date.recent(),
      expire_at: faker.date.recent(),
    };
  };
}
