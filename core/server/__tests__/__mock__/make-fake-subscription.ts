import ISubscription from "../../src/database/interfaces/subscription";

export type FakeSubscription = () => ISubscription;

export default function makeFakeSubscription({
  faker,
}: {
  faker: any;
}): FakeSubscription {
  return function fakeSubscription(): ISubscription {
    return {
      _id: faker.database.mongodbObjectId(),
      is_active: faker.datatype.boolean(),
      email: faker.internet.email(),
      updated_at: faker.date.recent(),
      created_at: faker.date.recent(),
      deleted_at: null,
    };
  };
}
