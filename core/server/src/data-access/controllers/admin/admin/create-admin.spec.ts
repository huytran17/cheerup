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
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdminByEmail from "../../../../use-cases/admin/get-admin-by-email";
import makeCreateAdminController from "./create-admin";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Admin from "../../../../database/entities/admin";
import { hashPassword } from "../../../../config/password";

describe("createAdmin", () => {
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
    const getAdminByEmail = makeGetAdminByEmail({ adminDb, logger });

    const mock_admin_data = fakeAdmin();

    const password_data = {
      password: "qwer1234",
      password_confirmation: "qwer1234",
    };

    const hashed_password = await hashPassword({ ...password_data });

    const created_admin = await createAdmin({
      adminDetails: { ...mock_admin_data, hash_password: hashed_password },
    });

    const createAdminController = makeCreateAdminController({
      createAdmin,
      getAdminByEmail,
      hashPassword,
      logger,
    });

    const request = {
      context: {
        validated: { ...created_admin, ...password_data, _id: null },
      },
    };

    const result = await createAdminController(request as any);

    const expected: ExpectSingleResult<Admin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
