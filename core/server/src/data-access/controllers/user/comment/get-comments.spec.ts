import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakeComment } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import Comment from "../../../../database/entities/comment";
import { CommentModel } from "../../../models";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComments from "../../../../use-cases/comment/get-comments";
import makeGetCommentsController from "./get-comments";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getComments", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains a list of comment entities", async () => {
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

    await createComment({
      commentDetails: mock_comment_data,
    });

    const getCommentsController = makeGetCommentsController({
      getComments,
      logger,
    });

    const request = {
      context: {
        validated: {},
      },
    };

    const result = await getCommentsController(request as any);

    const expected: ExpectMultipleResults<Comment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: {
        data: result?.body?.data,
      },
    };

    expect(result).toEqual(expected);
  });
});
