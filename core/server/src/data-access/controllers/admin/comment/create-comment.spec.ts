import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeComment } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCommentDb from "../../../make-comment-db";
import { CommentModel } from "../../../models";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeCreateCommentController from "./create-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";

describe("createComment", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an comment entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
    });

    const createComment = makeCreateComment({ commentDb });

    const mock_comment_data = fakeComment();

    const createCommentController = makeCreateCommentController({
      createComment,
    });

    const request = {
      context: {
        validated: mock_comment_data,
      },
    };

    const result = await createCommentController(request as any);

    const expected: ExpectSingleResult<IComment> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
