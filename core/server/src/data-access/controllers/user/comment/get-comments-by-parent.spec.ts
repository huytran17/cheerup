import moment from "moment";
import { fakeComment, fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";
import makeCountCommentLikeByCommentAndType from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import makeGetCommentLikeByUserAndComment from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeGetCommentsByParent from "../../../../use-cases/comment/get-comments-by-parent";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCommentDb from "../../../make-comment-db";
import makeCommentLikeDb from "../../../make-comment-like-db";
import makeUserDb from "../../../make-user-db";
import { CommentLikeModel, CommentModel, UserModel } from "../../../models";
import makeGetCommentsByParentController from "./get-comments-by-parent";

describe("getCommentsByParent", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a comment entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
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
    const getComment = makeGetComment({ commentDb });
    const getCommentsByParent = makeGetCommentsByParent({
      commentDb,
      randomCacheTime,
      redis,
      logger,
    });
    const countCommentLikeByCommentAndType =
      makeCountCommentLikeByCommentAndType({ commentLikeDb });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndComment({
      commentLikeDb,
    });

    const mock_comment_data = fakeComment();
    const mock_user_data = fakeUser();

    const [created_comment, created_user] = await Promise.all([
      createComment(mock_comment_data),
      createUser(mock_user_data),
    ]);

    const getCommentsByParentController = makeGetCommentsByParentController({
      getCommentsByParent,
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

    const result = await getCommentsByParentController(request as any);

    const expected: ExpectMultipleResults<IComment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
