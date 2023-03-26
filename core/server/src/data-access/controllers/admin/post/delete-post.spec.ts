import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePost } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makePostDb from "../../../make-post-db";
import { PostModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeDeletePost from "../../../../use-cases/post/delete-post";
import makeDeletePostController from "./delete-post";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Post from "../../../../database/entities/post";

describe("deletePost", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnectRedis()]);
  });

  it("should return a body that contains an post entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb, logger });
    const getPost = makeGetPost({ postDb, logger });
    const deletePost = makeDeletePost({ postDb, logger });

    const mock_post_data = fakePost();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const deletePostController = makeDeletePostController({
      getPost,
      deletePost,
      logger,
    });

    const request = {
      context: {
        validated: created_post,
      },
    };

    const result = await deletePostController(request as any);

    const expected: ExpectSingleResult<Post> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
