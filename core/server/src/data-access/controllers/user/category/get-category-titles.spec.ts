import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategoryTitles from "../../../../use-cases/category/get-category-titles";
import makeGetCategoryTitlesController from "./get-category-titles";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getCategoryTitles", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains an array of category' titles", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const getCategoryTitles = makeGetCategoryTitles({ categoryDb, logger });

    const getCategoryTitlesController = makeGetCategoryTitlesController({
      getCategoryTitles,
      logger,
    });

    const request = {
      context: {
        validated: {},
      },
    };

    const result = await getCategoryTitlesController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: {
        data: result?.body?.data,
      },
    };

    expect(result).toEqual(expected);
  });
});
