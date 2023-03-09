import ICommentLike, {
  CommentLikeType,
} from "../../src/database/interfaces/comment-like";

export type FakeCommentLike = () => ICommentLike;

export default function makeFakeCommentLike({
  faker,
}: {
  faker: any;
}): FakeCommentLike {
  return function fakeAdmin(): ICommentLike {
    return {
      _id: faker.database.mongodbObjectId(),
      comment: faker.database.mongodbObjectId(),
      user: faker.database.mongodbObjectId(),
      type: CommentLikeType.Like,
      created_at: faker.date.recent(),
    };
  };
}
