import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeCategory } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCategoryDb from "../../../make-category-db";
import { CategoryModel } from "../../../models";
import makeGetCategoryTitles from "../../../../use-cases/category/get-category-titles";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeGetCategoryTitlesController from "./get-category-titles";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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

    const getCategoryTitles = makeGetCategoryTitles({ categoryDb });
    const createCategory = makeCreateCategory({ categoryDb });

    const mock_category_data = fakeCategory();

    await createCategory({
      categoryDetails: mock_category_data,
    });

    const getCategoryTitlesController = makeGetCategoryTitlesController({
      getCategoryTitles,
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
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
