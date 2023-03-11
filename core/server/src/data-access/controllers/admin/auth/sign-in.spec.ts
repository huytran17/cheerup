import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingedInResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeGetAdminByEmail from "../../../../use-cases/admin/get-admin-by-email";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeSignInController from "./sign-in";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Admin from "../../../../database/entities/admin";
import { generateAccessToken } from "../../../../config/accessTokenManager";
import { verifyPassword } from "../../../../config/password";

describe("signIn", () => {
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
    const getAdminByEmail = makeGetAdminByEmail({
      adminDb,
      logger,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({
      adminDetails: mock_admin_data,
    });

    const signInController = makeSignInController({
      getAdminByEmail,
      generateAccessToken,
      verifyPassword,
      logger,
    });

    const request = {
      context: {
        user: created_admin,
      },
    };

    const result = await signInController(request as any);

    const expected: ExpectSingedInResult<Admin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: {
        access_token: result?.body?.data?.access_token,
        data: result?.body?.data?.user,
      },
    };

    expect(result).toEqual(expected);
  });
});
