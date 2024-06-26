import moment from "moment";
import { fakeCategory, fakePost } from "../../../../../__tests__/__mock__";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPost from "../../../../database/interfaces/post";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetSuggestionPosts from "../../../../use-cases/post/get-suggestion-posts";
import makeCategoryDb from "../../../make-category-db";
import makePostDb from "../../../make-post-db";
import { CategoryModel, PostModel } from "../../../models";
import makeGetSuggestionPostsController from "./get-suggestion-posts";

describe("getSuggestionPosts", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

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

    const createPost = makeCreatePost({ postDb });
    const createCategory = makeCreateCategory({ categoryDb });
    const getSuggestionPosts = makeGetSuggestionPosts({ postDb });

    const mock_post_data = fakePost();
    const mock_category_data = fakeCategory();

    const created_category = await createCategory(mock_category_data);
    const created_post = await createPost({
      ...mock_post_data,
      categories: [created_category],
    });

    const getSuggestionPostsController = makeGetSuggestionPostsController({
      getSuggestionPosts,
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

    const expected: ExpectMultipleResults<IPost> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
