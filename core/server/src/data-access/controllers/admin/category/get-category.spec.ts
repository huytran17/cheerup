import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategory from "../../../../use-cases/category/get-category";
import makeGetCategoryController from "./get-category";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Category from "../../../../database/entities/category";

describe("getCategory", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an category entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const createCategory = makeCreateCategory({ categoryDb });
    const getCategory = makeGetCategory({ categoryDb, logger });

    const mock_category_data = fakeCategory();

    const getCategoryController = makeGetCategoryController({
      getCategory,
    });

    const created_category = await createCategory({
      categoryDetails: mock_category_data,
    });

    const request = {
      context: {
        validated: created_category,
      },
    };

    const result = await getCategoryController(request as any);

    const expected: ExpectSingleResult<Category> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
