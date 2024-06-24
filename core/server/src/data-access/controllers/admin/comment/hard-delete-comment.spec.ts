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
import makeHardDeleteComment from "../../../../use-cases/comment/hard-delete-comment";
import makeCommentDb from "../../../make-comment-db";
import { CommentModel } from "../../../models";
import makeHardDeleteCommentController from "./hard-delete-comment";

describe("hardDeleteComment", () => {
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
    const hardDeleteComment = makeHardDeleteComment({ commentDb });

    const mock_comment_data = fakeComment();

    const hardDeleteCommentController = makeHardDeleteCommentController({
      getComment,
      hardDeleteComment,
    });

    const created_comment = await createComment(mock_comment_data);

    const request = {
      context: {
        validated: created_comment,
      },
    };

    const result = await hardDeleteCommentController(request as any);

    const expected: ExpectSingleResult<IComment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
