import IComment from "../../src/database/interfaces/comment";

export type FakeComment = () => IComment;

export default function makeFakeComment({
  faker,
}: {
  faker: any;
}): FakeComment {
  return function fakeComment(): IComment {
    return {
      _id: faker.database.mongodbObjectId(),
      content: faker.lorem.paragraph(),
      user: faker.database.mongodbObjectId(),
      post: faker.database.mongodbObjectId(),
      parent: null,
      is_parent: true,
      has_children: false,
      children: faker.helpers.arrayElements([
        faker.database.mongodbObjectId(),
        faker.database.mongodbObjectId(),
      ]),
      created_by: faker.database.mongodbObjectId(),
      updated_at: faker.date.recent(),
      created_at: faker.date.recent(),
      deleted_at: null,
    };
  };
}
