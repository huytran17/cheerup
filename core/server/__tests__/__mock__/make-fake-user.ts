import IUser from "../../src/database/interfaces/user";
import Randexp from "randexp";

export type FakeUser = () => IUser;

export default function makeFakeUser({ faker }: { faker: any }): FakeUser {
  return function fakeUser(): IUser {
    return {
      _id: new Randexp(/^[0-9a-f]{24}$/).gen(),
      ip: faker.internet.ipv4(),
      hash_password:
        "$2b$10$V4o6UDgoJEzzBsBPMqPAxeWZxVu8C6r7vJ4RwSluERi/akurd1LMW",
      full_name: faker.name.fullName(),
      is_blocked_comment: faker.datatype.boolean(),
      email: faker.internet.email(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      deleted_at: null,
    };
  };
}
