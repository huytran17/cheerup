import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategories from "../../../../use-cases/category/get-categories";
import makeGetCategoriesController from "./get-categories";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Category from "../../../../database/entities/category";

describe("getCategories", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an array of category entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const createCategory = makeCreateCategory({ categoryDb, logger });
    const getCategories = makeGetCategories({ categoryDb, logger });

    const mock_category_data = fakeCategory();

    const getCategoriesController = makeGetCategoriesController({
      getCategories,
      logger,
    });

    await createCategory({
      categoryDetails: mock_category_data,
    });

    const request = {
      context: {},
    };

    const result = await getCategoriesController(request as any);

    const expected: ExpectMultipleResults<Category> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
