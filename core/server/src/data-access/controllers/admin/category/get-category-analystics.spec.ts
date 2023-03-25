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
import makeGetCategoryAnalystics from "../../../../use-cases/category/get-category-analystics";
import makeGetCategoryAnalysticsController from "./get-category-analystics";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { ICategoryAnalyticsData } from "../../../interfaces/category-db";

describe("getCategoryAnalystics", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains analystic data", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const createCategory = makeCreateCategory({ categoryDb, logger });
    const getCategoryAnalystics = makeGetCategoryAnalystics({
      categoryDb,
      logger,
      redis,
    });

    const mock_category_data = fakeCategory();

    await createCategory({
      categoryDetails: mock_category_data,
    });

    const getCategoryAnalysticsController = makeGetCategoryAnalysticsController(
      {
        getCategoryAnalystics,
      }
    );

    const request = {
      context: {
        validated: {},
      },
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
