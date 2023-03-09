import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakeComment, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeUserDb from "../../../make-user-db";
import makeCommentDb from "../../../make-comment-db";
import Comment from "../../../../database/entities/comment";
import { CommentModel, CommentLikeModel, UserModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeGetCommentsByParentController from "./get-comments-by-parent";
import makeGetCommentsByParent from "../../../../use-cases/comment/get-comments-by-parent";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCountCommentLikeByCommentAndType from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import makeGetCommentLikeByUserAndComment from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import makeCommentLikeDb from "../../../make-comment-like-db";

describe("getCommentsByParent", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains a comment entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });
    const commentLikeDb = makeCommentLikeDb({
      commentLikeDbModel: CommentLikeModel,
      moment,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb, logger });
    const createComment = makeCreateComment({ commentDb, logger });
    const getComment = makeGetComment({ commentDb, logger });
    const getCommentsByParent = makeGetCommentsByParent({
      commentDb,
      logger,
    });
    const countCommentLikeByCommentAndType =
      makeCountCommentLikeByCommentAndType({ commentLikeDb, logger });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndComment({
      commentLikeDb,
      logger,
    });

    const mock_comment_data = fakeComment();
    const mock_user_data = fakeUser();

    const created_comment = await createComment({
      commentDetails: mock_comment_data,
    });
    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const getCommentsByParentController = makeGetCommentsByParentController({
      getCommentsByParent,
      getComment,
      countCommentLikeByCommentAndType,
      getCommentLikeByUserAndComment,
      logger,
    });

    const request = {
      context: {
        validated: created_comment,
        user: created_user,
      },
    };

    const result = await getCommentsByParentController(request as any);

    const expected: ExpectMultipleResults<Comment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
