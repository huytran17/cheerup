import IAdmin, { AdminType } from "../../src/database/interfaces/admin";

export type FakeAdmin = () => IAdmin;

export default function makeFakeAdmin({ faker }: { faker: any }): FakeAdmin {
  return function fakeAdmin(): IAdmin {
    return {
      _id: faker.database.mongodbObjectId,
      ip: faker.internet.ipv4(),
      hash_password:
        "$2b$10$V4o6UDgoJEzzBsBPMqPAxeWZxVu8C6r7vJ4RwSluERi/akurd1LMW",
      full_name: faker.name.fullName(),
      is_blocked_comment: faker.datatype.boolean(),
      email: faker.internet.email(),
      type: AdminType.Super,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      deleted_at: null,
    };
  };
}
