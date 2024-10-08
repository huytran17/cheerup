import moment from "moment";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategoryAnalystics from "../../../../use-cases/category/get-category-analystics";
import { ICategoryAnalyticsData } from "../../../interfaces/category-db";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategoryAnalysticsController from "./get-category-analystics";

describe("getCategoryAnalystics", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains analystic data", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const createCategory = makeCreateCategory({ categoryDb });
    const getCategoryAnalystics = makeGetCategoryAnalystics({
      categoryDb,
      randomCacheTime,
      logger,
      redis,
    });

    const mock_category_data = fakeCategory();

    await createCategory(mock_category_data);

    const getCategoryAnalysticsController = makeGetCategoryAnalysticsController(
      {
        getCategoryAnalystics,
      }
    );

    const request = {
      context: {},
    };

    const result = await getCategoryAnalysticsController(request as any);

    const expected: ExpectSingleResult<ICategoryAnalyticsData> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
