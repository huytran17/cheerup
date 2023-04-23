import IPost from "../../src/database/interfaces/post";

export type FakePost = () => IPost;

export default function makeFakePost({ faker }: { faker: any }): FakePost {
  return function fakePost(): IPost {
    return {
      _id: faker.database.mongodbObjectId(),
      title: faker.name.jobTitle(),
      description: faker.lorem.paragraph(),
      source: faker.lorem.word(),
      thumbnail_url: faker.internet.url(),
      is_blocked_comment: false,
      is_published: true,
      is_notified_to_user: faker.datatype.boolean(),
      content: faker.lorem.paragraphs(),
      tags: faker.helpers.arrayElements(),
      author: faker.database.mongodbObjectId(),
      published_by: faker.database.mongodbObjectId(),
      categories: faker.helpers.arrayElements([
        faker.database.mongodbObjectId(),
        faker.database.mongodbObjectId(),
      ]),
      views: faker.random.numeric(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      published_at: faker.date.recent(),
      deleted_at: null,
    };
  };
}
