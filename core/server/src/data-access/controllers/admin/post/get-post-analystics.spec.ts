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
import { IPostAnalytics } from "../../../../data-access/interfaces/post-db";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPostAnalystics from "../../../../use-cases/post/get-post-analystics";
import makePostDb from "../../../make-post-db";
import { PostModel } from "../../../models";
import makeGetPostAnalysticsController from "./get-post-analystics";

describe("getPostAnalystics", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains analystic data", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb });
    const getPostAnalystics = makeGetPostAnalystics({ postDb, logger, redis });

    const mock_post_data = fakePost();

    await createPost(mock_post_data);

    const getPostAnalysticsController = makeGetPostAnalysticsController({
      getPostAnalystics,
    });

    const request = {
      context: {},
    };

    const result = await getPostAnalysticsController(request as any);

    const expected: ExpectSingleResult<IPostAnalytics> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
