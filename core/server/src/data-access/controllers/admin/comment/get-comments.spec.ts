import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakeComment } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCommentDb from "../../../make-comment-db";
import { CommentModel } from "../../../models";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComments from "../../../../use-cases/comment/get-comments";
import makeGetCommentsController from "./get-comments";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";

describe("getComments", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an array of comment entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
    });

    const createComment = makeCreateComment({ commentDb });
    const getComments = makeGetComments({ commentDb });

    const mock_comment_data = fakeComment();

    const getCommentsController = makeGetCommentsController({
      getComments,
    });

    await createComment({
      commentDetails: mock_comment_data,
    });

    const request = {
      context: {},
    };

    const result = await getCommentsController(request as any);

    const expected: ExpectMultipleResults<IComment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
