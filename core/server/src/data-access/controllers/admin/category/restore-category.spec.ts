import moment from "moment";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ICategory from "../../../../database/interfaces/category";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetSoftCategory from "../../../../use-cases/category/get-soft-deleted-category";
import makeUpdateCategory from "../../../../use-cases/category/update-category";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeRestoreCategoryController from "./restore-category";

describe("restoreCategory", () => {
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
    const getSoftDeletedCategory = makeGetSoftCategory({ categoryDb });
    const updateCategory = makeUpdateCategory({ categoryDb });

    const mock_category_data = fakeCategory();

    const restoreCategoryController = makeRestoreCategoryController({
      getSoftDeletedCategory,
      updateCategory,
      logger,
    });

    const created_category = await createCategory(mock_category_data);

    const request = {
      context: {
        validated: created_category,
      },
    };

    const result = await restoreCategoryController(request as any);

    const expected: ExpectSingleResult<ICategory> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
