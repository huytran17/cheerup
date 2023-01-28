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
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeGetCommentsByParentController from "./get-comments-by-parent";
import makeGetCommentsByParent from "../../../../use-cases/comment/get-comments-by-parent";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getCommentsByParent", () => {
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

    const createComment = makeCreateComment({ commentDb, logger });
    const getComment = makeGetComment({ commentDb, logger });
    const getCommentsByParent = makeGetCommentsByParent({
      commentDb,
      logger,
    });

    const mock_comment_data = fakeComment();

    const created_comment = await createComment({
      commentDetails: mock_comment_data,
    });

    const getCommentsByParentController = makeGetCommentsByParentController({
      getCommentsByParent,
      getComment,
      logger,
    });

    const request = {
      context: {
        validated: created_comment,
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
