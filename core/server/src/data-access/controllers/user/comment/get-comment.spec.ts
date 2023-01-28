import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeComment } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import makeCommentLikeDb from "../../../make-comment-like-db";
import Comment from "../../../../database/entities/comment";
import { CommentModel, CommentLikeModel } from "../../../models";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeGetCommentController from "./get-comment";
import makeCountCommentLikeByCommentAndType from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import makeGetCommentLikeByUserAndComment from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getComment", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

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
      moment,
    });

    const createComment = makeCreateComment({ commentDb, logger });
    const getComment = makeGetComment({ commentDb, logger });
    const countCommentLikeByCommentAndType =
      makeCountCommentLikeByCommentAndType({ commentLikeDb, logger });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndComment({
      commentLikeDb,
      logger,
    });

    const mock_comment_data = fakeComment();

    const created_comment = await createComment({
      commentDetails: mock_comment_data,
    });

    const getCommentController = makeGetCommentController({
      getComment,
      countCommentLikeByCommentAndType,
      getCommentLikeByUserAndComment,
      logger,
    });

    const request = {
      context: {
        validated: created_comment,
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
