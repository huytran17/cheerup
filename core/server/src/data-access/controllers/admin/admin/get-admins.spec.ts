import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeGetAdmins from "../../../../use-cases/admin/get-admins";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdminsController from "./get-admins";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Admin from "../../../../database/entities/admin";

describe("getAdmins", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an array of admin entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const getAdmins = makeGetAdmins({
      adminDb,
      logger,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({
      adminDetails: mock_admin_data,
    });

    const getAdminsController = makeGetAdminsController({
      getAdmins,
    });

    const request = {
      context: {
        validated: created_admin._id,
      },
    };

    const result = await getAdminsController(request as any);

    const expected: ExpectMultipleResults<Admin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
