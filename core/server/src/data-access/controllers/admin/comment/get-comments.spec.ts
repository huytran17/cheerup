import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakeComment } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import { CommentModel } from "../../../models";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComments from "../../../../use-cases/comment/get-comments";
import makeGetCommentsController from "./get-comments";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Comment from "../../../../database/entities/comment";

describe("getComments", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an array of comment entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });

    const createComment = makeCreateComment({ commentDb, logger });
    const getComments = makeGetComments({ commentDb, logger });

    const mock_comment_data = fakeComment();

    const getCommentsController = makeGetCommentsController({
      getComments,
      logger,
    });

    const created_comment = await createComment({
      commentDetails: mock_comment_data,
    });

    const request = {
      context: {
        validated: created_comment,
      },
    };

    const result = await getCommentsController(request as any);

    const expected: ExpectMultipleResults<Comment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
