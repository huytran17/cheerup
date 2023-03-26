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
import makeGetPostAnalystics from "../../../../use-cases/post/get-post-analystics";
import makeGetPostAnalysticsController from "./get-post-analystics";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IPostAnalytics } from "../../../../data-access/interfaces/post-db";

describe("getPostAnalystics", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

  it("should return a body that contains analystic data", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb, logger });
    const getPostAnalystics = makeGetPostAnalystics({ postDb, logger, redis });

    const mock_post_data = fakePost();

    await createPost({
      postDetails: mock_post_data,
    });

    const getPostAnalysticsController = makeGetPostAnalysticsController({
      getPostAnalystics,
    });

    const request = {
      context: {
        validated: {},
      },
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
