import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategory from "../../../../use-cases/category/get-category";
import makeUpdateCategory from "../../../../use-cases/category/update-category";
import makeRestoreCategoryController from "./restore-category";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Category from "../../../../database/entities/category";

describe("restoreCategory", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an category entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const createCategory = makeCreateCategory({ categoryDb, logger });
    const getCategory = makeGetCategory({ categoryDb, logger });
    const updateCategory = makeUpdateCategory({ categoryDb, logger });

    const mock_category_data = fakeCategory();

    const restoreCategoryController = makeRestoreCategoryController({
      getCategory,
      updateCategory,
      logger,
    });

    const created_category = await createCategory({
      categoryDetails: mock_category_data,
    });

    const request = {
      context: {
        validated: created_category,
      },
    };

    const result = await restoreCategoryController(request as any);

    const expected: ExpectSingleResult<Category> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});