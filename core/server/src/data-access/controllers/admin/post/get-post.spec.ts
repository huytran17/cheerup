import moment from "moment";
import { fakePost } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPost from "../../../../database/interfaces/post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makePostDb from "../../../make-post-db";
import { PostModel } from "../../../models";
import makeGetPostController from "./get-post";

describe("getPost", () => {
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
    const getPost = makeGetPost({ postDb });

    const mock_post_data = fakePost();

    const created_post = await createPost(mock_post_data);

    const getPostController = makeGetPostController({
      getPost,
    });

    const request = {
      context: {
        validated: created_post,
      },
    };

    const result = await getPostController(request as any);

    const expected: ExpectSingleResult<IPost> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
