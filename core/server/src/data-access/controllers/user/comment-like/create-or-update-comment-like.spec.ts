import moment from "moment";
import {
  fakeComment,
  fakeCommentLike,
  fakeUser,
} from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ICommentLike from "../../../../database/interfaces/comment-like";
import makeCreateCommentLike from "../../../../use-cases/comment-like/create-comment-like";
import makeGetCommentLikeByUserAndPost from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import makeHardDeleteCommentLike from "../../../../use-cases/comment-like/hard-delete-comment-like";
import makeUpdateCommentLike from "../../../../use-cases/comment-like/update-comment-like";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCommentDb from "../../../make-comment-db";
import makeCommentLikeDb from "../../../make-comment-like-db";
import makeUserDb from "../../../make-user-db";
import { CommentLikeModel, CommentModel, UserModel } from "../../../models";
import makeCreateOrUpdateCommentLikeController from "./create-or-update-comment-like";

describe("createOrUpdateCommentLike", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body with no data", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentLikeDb = makeCommentLikeDb({
      commentLikeDbModel: CommentLikeModel,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });
    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
    });

    const createCommentLike = makeCreateCommentLike({
      commentLikeDb,
    });
    const updateCommentLike = makeUpdateCommentLike({
      commentLikeDb,
    });
    const createComment = makeCreateComment({
      commentDb,
    });
    const getComment = makeGetComment({
      commentDb,
    });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndPost({
      commentLikeDb,
    });
    const hardDeleteCommentLike = makeHardDeleteCommentLike({
      commentLikeDb,
    });
    const createUser = makeCreateUser({ userDb });

    const mock_comment_like_data = fakeCommentLike();
    const mock_user_data = fakeUser();
    const mock_comment_data = fakeComment();

    const [created_user, created_comment] = await Promise.all([
      createUser(mock_user_data),
      createComment(mock_comment_data),
    ]);

    const countCommentLikesController = makeCreateOrUpdateCommentLikeController(
      {
        createCommentLike,
        updateCommentLike,
        hardDeleteCommentLike,
        getComment,
        getCommentLikeByUserAndComment,
      }
    );

    const request = {
      context: {
        validated: {
          ...mock_comment_like_data,
          comment_id: created_comment._id,
        },
        user: created_user,
      },
    };

    const result = await countCommentLikesController(request as any);

    const expected: ExpectSingleResult<ICommentLike> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: {
        data: undefined,
      },
    };

    expect(result).toEqual(expected);
  });
});
