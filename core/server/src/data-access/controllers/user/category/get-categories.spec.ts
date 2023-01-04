import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategories from "../../../../use-cases/category/get-categories";
import makeGetCategoriesController from "./get-categories";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getMe", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains an array of categories", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const getCategories = makeGetCategories({ categoryDb, logger });

    const getCategoriesController = makeGetCategoriesController({
      getCategories,
      logger,
    });

    const request = {
      context: {
        user: {
          validated: {},
        },
      },
    };

    const result = await getCategoriesController(request as any);

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
