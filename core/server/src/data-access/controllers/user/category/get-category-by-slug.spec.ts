import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategory from "../../../../use-cases/category/get-category";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategoryController from "./get-category";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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

    const getCategory = makeGetCategory({ categoryDb });
    const createCategory = makeCreateCategory({ categoryDb });

    const mock_category_data = fakeCategory();

    const created_category = await createCategory({
      categoryDetails: mock_category_data,
    });

    const getCategoryController = makeGetCategoryController({
      getCategory,
    });

    const request = {
      context: {
        validated: created_category,
      },
    };

    const result = await getCategoryController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
