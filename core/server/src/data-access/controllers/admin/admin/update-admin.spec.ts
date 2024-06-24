import moment from "moment";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdmin from "../../../../use-cases/admin/get-admin";
import makeUpdateAdmin from "../../../../use-cases/admin/update-admin";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeUpdateAdminController from "./update-admin";

describe("updateAdmin", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an admin entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const updateAdmin = makeUpdateAdmin({ adminDb });
    const getAdmin = makeGetAdmin({
      adminDb,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin(mock_admin_data);

    const updateAdminController = makeUpdateAdminController({
      getAdmin,
      updateAdmin,
      logger,
    });

    const request = {
      context: {
        validated: created_admin,
      },
    };

    const result = await updateAdminController(request as any);

    const expected: ExpectSingleResult<IAdmin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
