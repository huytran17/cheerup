import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import {
  fakeCategory,
  fakePost,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCategoryDb from "../../../make-category-db";
import makePostDb from "../../../make-post-db";
import { CategoryModel, PostModel } from "../../../models";
import makeCountPostByCategory from "../../../../use-cases/post/count-post-by-category";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategoriesPaginated from "../../../../use-cases/category/get-categories-paginated";
import makeGetOutstandingCategoriesPaginatedController from "./get-outstanding-categories-paginated";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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
    const countPostByCategory = makeCountPostByCategory({ postDb });
    const getCategoriesPaginated = makeGetCategoriesPaginated({ categoryDb });

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
