import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeCategory, fakeAdmin } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCategoryDb from "../../../make-category-db";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel, CategoryModel } from "../../../models";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetCategoryByTitle from "../../../../use-cases/category/get-category-by-title";
import makeCreateCategoryController from "./create-category";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Category from "../../../../database/entities/category";

describe("createCategory", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an category entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const categoryDb = makeCategoryDb({
      categoryDbModel: CategoryModel,
      moment,
    });

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb, logger });
    const createCategory = makeCreateCategory({ categoryDb, logger });
    const getCategoryByTitle = makeGetCategoryByTitle({ categoryDb, logger });

    const mock_category_data = fakeCategory();
    const mock_admin_data = fakeAdmin();

    const createCategoryController = makeCreateCategoryController({
      createCategory,
      getCategoryByTitle,
      logger,
    });

    const created_admin = await createAdmin({ adminDetails: mock_admin_data });

    const request = {
      context: {
        validated: mock_category_data,
        user: created_admin,
      },
    };

    const result = await createCategoryController(request as any);

    const expected: ExpectSingleResult<Category> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});