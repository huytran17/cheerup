import moment from "moment";
import { fakeAdmin, fakeCategory } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ICategory from "../../../../database/interfaces/category";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeCreateCategory from "../../../../use-cases/category/create-category";
import makeAdminDb from "../../../make-admin-db";
import makeCategoryDb from "../../../make-category-db";
import { AdminModel, CategoryModel } from "../../../models";
import makeCreateCategoryController from "./create-category";

describe("createCategory", () => {
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

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const createCategory = makeCreateCategory({ categoryDb });

    const mock_category_data = fakeCategory();
    const mock_admin_data = fakeAdmin();

    const createCategoryController = makeCreateCategoryController({
      createCategory,
      logger,
    });

    const created_admin = await createAdmin(mock_admin_data);

    const request = {
      context: {
        validated: mock_category_data,
        user: created_admin,
      },
    };

    const result = await createCategoryController(request as any);

    const expected: ExpectSingleResult<ICategory> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
