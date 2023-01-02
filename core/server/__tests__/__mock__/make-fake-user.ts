import IUser from "../../src/database/interfaces/user";

export type FakeUser = () => IUser;

export default function makeFakeUser({ faker }: { faker: any }): FakeUser {
  return function fakeUser(): IUser {
    return {
      _id: faker.database.mongodbObjectId(),
      ip: faker.internet.ipv4(),
      hash_password:
        "$2b$10$NFtC.yQZ.JMI3HT1KBq8OOyY3EPu8oqmiXMQpGodmbYl9xblDX1gi",
      full_name: faker.name.fullName(),
      is_blocked_comment: faker.datatype.boolean(),
      email: faker.internet.email(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      deleted_at: null,
    };
  };
}
