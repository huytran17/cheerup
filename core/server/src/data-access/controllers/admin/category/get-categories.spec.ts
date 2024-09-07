import moment from "moment";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ICategory from "../../../../database/interfaces/category";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategories from "../../../../use-cases/category/get-categories";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategoriesController from "./get-categories";

describe("getCategories", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an array of category entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const createCategory = makeCreateCategory({ categoryDb });
    const getCategories = makeGetCategories({
      categoryDb,
      randomCacheTime,
      redis,
      logger,
    });

    const mock_category_data = fakeCategory();

    const getCategoriesController = makeGetCategoriesController({
      getCategories,
    });

    await createCategory(mock_category_data);

    const request = {
      context: {},
    };

    const result = await getCategoriesController(request as any);

    const expected: ExpectMultipleResults<ICategory> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
