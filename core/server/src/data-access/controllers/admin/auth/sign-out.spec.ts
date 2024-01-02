import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingedOutResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeGetAdminByEmail from "../../../../use-cases/admin/get-admin-by-email";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeSignOutController from "./sign-out";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("signOut", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains a account status", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const getAdminByEmail = makeGetAdminByEmail({
      adminDb,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({
      adminDetails: mock_admin_data,
    });

    const signOutController = makeSignOutController({
      getAdminByEmail,
    });

    const request = {
      context: {
        user: created_admin,
      },
    };

    const result = await signOutController(request as any);

    const expected: ExpectSingedOutResult = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
