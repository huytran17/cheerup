import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeGetAdmin from "../../../../use-cases/admin/get-admin";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeUpdateAdmin from "../../../../use-cases/admin/update-admin";
import makeEnableAutoCensorshipController from "./enable-auto-censorship";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Admin from "../../../../database/entities/admin";

describe("enableAutoCensorship", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

  it("should return a body that contains an admin entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb, logger });
    const updateAdmin = makeUpdateAdmin({ adminDb, logger });
    const getAdmin = makeGetAdmin({ adminDb, logger });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({
      adminDetails: mock_admin_data,
    });

    const enableAutoCensorshipController = makeEnableAutoCensorshipController({
      getAdmin,
      updateAdmin,
      logger,
    });

    const request = {
      context: {
        validated: created_admin,
      },
    };

    const result = await enableAutoCensorshipController(request as any);

    const expected: ExpectSingleResult<Admin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
