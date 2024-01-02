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
import makeHardDeleteCategory from "../../../../use-cases/category/hard-delete-category";
import makeHardDeleteCategoryController from "./hard-delete-category";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ICategory from "../../../../database/interfaces/category";

describe("hardDeleteCategory", () => {
  beforeAll(async () => await connectDatabase());

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
    const getCategory = makeGetCategory({ categoryDb });
    const hardDeleteCategory = makeHardDeleteCategory({ categoryDb });

    const mock_category_data = fakeCategory();

    const hardDeleteCategoryController = makeHardDeleteCategoryController({
      getCategory,
      hardDeleteCategory,
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

    const result = await hardDeleteCategoryController(request as any);

    const expected: ExpectSingleResult<ICategory> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
