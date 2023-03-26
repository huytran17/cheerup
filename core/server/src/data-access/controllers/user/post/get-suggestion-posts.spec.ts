import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakePost, fakeCategory } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makePostDb from "../../../make-post-db";
import makeCategoryDb from "../../../make-category-db";
import Post from "../../../../database/entities/post";
import { PostModel, CategoryModel } from "../../../models";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetSuggestionPosts from "../../../../use-cases/post/get-suggestion-posts";
import makeGetSuggestionPostsController from "./get-suggestion-posts";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getSuggestionPosts", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

  it("it should return a body that contains a list of posts entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });
    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb, logger });
    const createCategory = makeCreateCategory({ categoryDb, logger });
    const getSuggestionPosts = makeGetSuggestionPosts({ postDb, logger });

    const mock_post_data = fakePost();
    const mock_category_data = fakeCategory();

    const created_category = await createCategory({
      categoryDetails: mock_category_data,
    });

    const created_post = await createPost({
      postDetails: { ...mock_post_data, categories: [created_category] },
    });

    const getSuggestionPostsController = makeGetSuggestionPostsController({
      getSuggestionPosts,
      logger,
    });

    const request = {
      context: {
        validated: {
          amount: 5,
          categories: [created_category._id],
          exclude_ids: [created_post._id],
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
