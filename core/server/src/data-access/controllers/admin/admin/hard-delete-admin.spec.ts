import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeGetAdmin from "../../../../use-cases/admin/get-admin";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeHardDeleteAdmin from "../../../../use-cases/admin/hard-delete-admin";
import makeHardDeleteAdminController from "./hard-delete-admin";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Admin from "../../../../database/entities/admin";

describe("hardDeleteAdmin", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
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
    const hardDeleteAdmin = makeHardDeleteAdmin({ adminDb, logger });
    const getAdmin = makeGetAdmin({
      adminDb,
      logger,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({
      adminDetails: mock_admin_data,
    });

    const hardDeleteAdminController = makeHardDeleteAdminController({
      getAdmin,
      hardDeleteAdmin,
      logger,
    });

    const request = {
      context: {
        validated: created_admin,
      },
    };

    const result = await hardDeleteAdminController(request as any);

    const expected: ExpectSingleResult<Admin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
