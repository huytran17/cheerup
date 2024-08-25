import moment from "moment";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategoryBySlug from "../../../../use-cases/category/get-category-by-slug";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategoryBySlugController from "./get-category-by-slug";

describe("getCategoryBySlug", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains an a category entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const getCategoryBySlug = makeGetCategoryBySlug({ categoryDb });
    const createCategory = makeCreateCategory({ categoryDb });

    const mock_category_data = fakeCategory();

    const created_category = await createCategory(mock_category_data);

    const getCategoryBySlugController = makeGetCategoryBySlugController({
      getCategoryBySlug,
    });

    const request = {
      context: {
        validated: created_category,
      },
    };

    const result = await getCategoryBySlugController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
