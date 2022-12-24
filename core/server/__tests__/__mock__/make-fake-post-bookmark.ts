import IPostBookmark from "../../src/database/interfaces/post-bookmark";

export type FakePostBookmark = () => IPostBookmark;

export default function makeFakeCategory({
  faker,
}: {
  faker: any;
}): FakePostBookmark {
  return function fakePostBookmark(): IPostBookmark {
    return {
      _id: faker.database.mongodbObjectId(),
      post: faker.database.mongodbObjectId(),
      user: faker.database.mongodbObjectId(),
      updated_at: faker.date.recent(),
      created_at: faker.date.recent(),
    };
  };
}
