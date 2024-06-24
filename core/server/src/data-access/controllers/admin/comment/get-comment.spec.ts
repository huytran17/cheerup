import { fakeComment } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeCommentDb from "../../../make-comment-db";
import { CommentModel } from "../../../models";
import makeGetCommentController from "./get-comment";

describe("getComment", () => {
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
    const getComment = makeGetComment({ commentDb });

    const mock_comment_data = fakeComment();

    const getCommentController = makeGetCommentController({
      getComment,
    });

    const created_comment = await createComment(mock_comment_data);

    const request = {
      context: {
        validated: { _id: created_comment._id },
      },
    };

    const result = await getCommentController(request as any);

    const expected: ExpectSingleResult<IComment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
