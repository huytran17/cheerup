import moment from "moment";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategoryTitles from "../../../../use-cases/category/get-category-titles";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategoryTitlesController from "./get-category-titles";

describe("getCategoryTitles", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains an array of category titles", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const getCategoryTitles = makeGetCategoryTitles({
      categoryDb,
      randomCacheTime,
      redis,
      logger,
    });

    const createCategory = makeCreateCategory({ categoryDb });

    const mock_category_data = fakeCategory();

    await createCategory(mock_category_data);

    const getCategoryTitlesController = makeGetCategoryTitlesController({
      getCategoryTitles,
    });

    const request = {
      context: {},
    };

    const result = await getCategoryTitlesController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
