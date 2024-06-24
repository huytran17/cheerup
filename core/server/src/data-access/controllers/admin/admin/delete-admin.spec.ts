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
import makeDeleteAdmin from "../../../../use-cases/admin/delete-admin";
import makeGetAdmin from "../../../../use-cases/admin/get-admin";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeDeleteAdminController from "./delete-admin";

describe("deleteAdmin", () => {
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
    const deleteAdmin = makeDeleteAdmin({ adminDb });
    const getAdmin = makeGetAdmin({
      adminDb,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin(mock_admin_data);

    const deleteAdminController = makeDeleteAdminController({
      getAdmin,
      deleteAdmin,
      logger,
    });

    const request = {
      context: {
        validated: created_admin,
      },
    };

    const result = await deleteAdminController(request as any);

    const expected: ExpectSingleResult<IAdmin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
