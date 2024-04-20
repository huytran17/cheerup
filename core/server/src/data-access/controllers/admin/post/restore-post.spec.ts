import moment from "moment";
import { fakePost } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Post from "../../../../database/entities/post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetSoftDeletedPost from "../../../../use-cases/post/get-soft-deleted-post";
import makeUpdatePost from "../../../../use-cases/post/update-post";
import makePostDb from "../../../make-post-db";
import { PostModel } from "../../../models";
import makeRestorePostController from "./restore-post";

describe("restorePost", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an post entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb });
    const getSoftDeletedPost = makeGetSoftDeletedPost({ postDb });
    const updatePost = makeUpdatePost({ postDb });

    const mock_post_data = fakePost();

    const created_post = await createPost(mock_post_data);

    const restorePostController = makeRestorePostController({
      getSoftDeletedPost,
      updatePost,
      logger,
    });

    const request = {
      context: {
        validated: created_post,
      },
    };

    const result = await restorePostController(request as any);

    const expected: ExpectSingleResult<Post> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
