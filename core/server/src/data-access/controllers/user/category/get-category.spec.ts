import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategory from "../../../../use-cases/category/get-category";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategoryController from "./get-category";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getCategory", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains an a category entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const getCategory = makeGetCategory({ categoryDb, logger });
    const createCategory = makeCreateCategory({ categoryDb, logger });

    const mock_category_data = fakeCategory();

    const created_category = await createCategory({
      categoryDetails: mock_category_data,
    });

    const getCategoryController = makeGetCategoryController({
      getCategory,
      logger,
    });

    const request = {
      context: {
        user: {
          validated: {
            category_id: created_category._id,
          },
        },
      },
    };

    const result = await getCategoryController(request as any);

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
