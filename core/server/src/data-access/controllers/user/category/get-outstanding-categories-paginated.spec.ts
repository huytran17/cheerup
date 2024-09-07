import moment from "moment";
import {
  fakeCategory,
  fakePost,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategoriesPaginated from "../../../../use-cases/category/get-categories-paginated";
import makeCountPostByCategory from "../../../../use-cases/post/count-post-by-category";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCategoryDb from "../../../make-category-db";
import makePostDb from "../../../make-post-db";
import { CategoryModel, PostModel } from "../../../models";
import makeGetOutstandingCategoriesPaginatedController from "./get-outstanding-categories-paginated";

describe("getOutstandingCategoriesPaginated", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains an array of category entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });
    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const createCategory = makeCreateCategory({ categoryDb });
    const createPost = makeCreatePost({ postDb });
    const countPostByCategory = makeCountPostByCategory({
      postDb,
      randomCacheTime,
      redis,
      logger,
    });
    const getCategoriesPaginated = makeGetCategoriesPaginated({
      categoryDb,
      randomCacheTime,
      redis,
      logger,
    });

    const mock_category_data = fakeCategory();
    const mock_post_data = fakePost();
    const query_params = fakeQueryParams();

    const created_category = await createCategory(mock_category_data);

    await createPost({
      ...mock_post_data,
      categories: [created_category],
    });

    const getOutstandingCategoriesPaginatedController =
      makeGetOutstandingCategoriesPaginatedController({
        countPostByCategory,
        getCategoriesPaginated,
      });

    const request = {
      context: {
        validated: query_params,
      },
    };

    const result = await getOutstandingCategoriesPaginatedController(
      request as any
    );

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
