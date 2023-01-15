import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import makePostDb from "../../../make-post-db";
import Post from "../../../../database/entities/post";
import { PostModel } from "../../../models";
import makeGetSuggestionPosts from "../../../../use-cases/post/get-suggestion-posts";
import makeGetSuggestionPostsController from "./get-suggestion-posts";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getSuggestionPosts", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains a list of posts entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const getSuggestionPosts = makeGetSuggestionPosts({ postDb, logger });

    const getSuggestionPostsController = makeGetSuggestionPostsController({
      getSuggestionPosts,
      logger,
    });

    const request = {
      context: {
        validated: {
          amount: 1,
        },
      },
    };

    const result = await getSuggestionPostsController(request as any);

    const expected: ExpectMultipleResults<Post> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
