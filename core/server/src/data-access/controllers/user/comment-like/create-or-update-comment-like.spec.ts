import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeCommentLike, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeUserDb from "../../../make-user-db";
import makeCommentLikeDb from "../../../make-comment-like-db";
import makeCommentDb from "../../../make-comment-db";
import CommentLike from "../../../../database/entities/comment-like";
import { CommentLikeModel, UserModel, CommentModel } from "../../../models";
import makeCreateCommentLike from "../../../../use-cases/comment-like/create-comment-like";
import makeHardDeleteCommentLike from "../../../../use-cases/comment-like/hard-delete-comment-like";
import makeUpdateCommentLike from "../../../../use-cases/comment-like/update-comment-like";
import makeGetCommentLikeByUserAndPost from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeCreateOrUpdateCommentLikeController from "./create-or-update-comment-like";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("createOrUpdateCommentLike", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body with no data", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentLikeDb = makeCommentLikeDb({
      commentLikeDbModel: CommentLikeModel,
      moment,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });
    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });

    const createCommentLike = makeCreateCommentLike({
      commentLikeDb,
      logger,
    });
    const updateCommentLike = makeUpdateCommentLike({
      commentLikeDb,
      logger,
    });
    const getUser = makeGetUser({
      userDb,
      logger,
    });
    const getComment = makeGetComment({
      commentDb,
      logger,
    });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndPost({
      commentLikeDb,
      logger,
    });
    const hardDeleteCommentLike = makeHardDeleteCommentLike({
      commentLikeDb,
      logger,
    });
    const createUser = makeCreateUser({ userDb, logger });

    const mock_comment_like_data = fakeCommentLike();
    const mock_user_data = fakeUser();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const countCommentLikesController = makeCreateOrUpdateCommentLikeController(
      {
        createCommentLike,
        updateCommentLike,
        hardDeleteCommentLike,
        getUser,
        getComment,
        getCommentLikeByUserAndComment,
        logger,
      }
    );

    const request = {
      context: {
        validated: mock_comment_like_data,
        user: created_user,
      },
    };

    const result = await countCommentLikesController(request as any);

    const expected: ExpectSingleResult<CommentLike> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: null,
    };

    expect(result).toEqual(expected);
  });
});
