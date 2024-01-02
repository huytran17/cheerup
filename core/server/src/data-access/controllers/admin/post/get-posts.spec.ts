import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakePost } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makePostDb from "../../../make-post-db";
import { PostModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPosts from "../../../../use-cases/post/get-posts";
import makeGetPostsController from "./get-posts";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPost from "../../../../database/interfaces/post";

describe("getPosts", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an array of post entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb });
    const getPosts = makeGetPosts({ postDb });

    const mock_post_data = fakePost();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const getPostsController = makeGetPostsController({
      getPosts,
    });

    const request = {
      context: {
        validated: created_post,
      },
    };

    const result = await getPostsController(request as any);

    const expected: ExpectMultipleResults<IPost> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
