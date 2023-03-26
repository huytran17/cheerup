import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeComment } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCommentDb from "../../../make-comment-db";
import { CommentModel } from "../../../models";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeGetCommentController from "./get-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Comment from "../../../../database/entities/comment";

describe("getComment", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

  it("should return a body that contains an comment entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });

    const createComment = makeCreateComment({ commentDb, logger });
    const getComment = makeGetComment({ commentDb, logger });

    const mock_comment_data = fakeComment();

    const getCommentController = makeGetCommentController({
      getComment,
      logger,
    });

    const created_comment = await createComment({
      commentDetails: mock_comment_data,
    });

    const request = {
      context: {
        validated: { comment_id: created_comment._id },
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
