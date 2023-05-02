import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeComment, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCommentDb from "../../../make-comment-db";
import makeCommentLikeDb from "../../../make-comment-like-db";
import Comment from "../../../../database/entities/comment";
import { CommentModel, CommentLikeModel, UserModel } from "../../../models";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeGetCommentController from "./get-comment";
import makeCountCommentLikeByCommentAndType from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import makeGetCommentLikeByUserAndComment from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeUserDb from "../../../make-user-db";

describe("getComment", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a comment entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });
    const commentLikeDb = makeCommentLikeDb({
      commentLikeDbModel: CommentLikeModel,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb });
    const createComment = makeCreateComment({ commentDb });
    const getComment = makeGetComment({ commentDb, logger });
    const countCommentLikeByCommentAndType =
      makeCountCommentLikeByCommentAndType({ commentLikeDb });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndComment({
      commentLikeDb,
    });

    const mock_comment_data = fakeComment();
    const mock_user_data = fakeUser();

    const created_comment = await createComment({
      commentDetails: mock_comment_data,
    });
    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const getCommentController = makeGetCommentController({
      getComment,
      countCommentLikeByCommentAndType,
      getCommentLikeByUserAndComment,
    });

    const request = {
      context: {
        validated: created_comment,
        user: created_user,
      },
    };

    const result = await getCommentController(request as any);

    const expected: ExpectSingleResult<Comment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
