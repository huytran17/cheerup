import ICategory from "../../src/database/interfaces/category";

export type FakeCategory = () => ICategory;

export default function makeFakeCategory({
  faker,
}: {
  faker: any;
}): FakeCategory {
  return function fakeCategory(): ICategory {
    return {
      _id: faker.database.mongodbObjectId(),
      title: faker.lorem.text(),
      description: faker.lorem.paragraph(),
      badge_color: faker.color.rgb({ prefix: "#", casing: "lower" }),
      created_by: faker.database.mongodbObjectId(),
      updated_at: faker.date.recent(),
      created_at: faker.date.recent(),
      deleted_at: null,
    };
  };
}
