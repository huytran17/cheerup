import moment from "moment";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { generateAccessToken } from "../../../../config/accessTokenManager";
import { hashPassword, verifyPassword } from "../../../../config/password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdminByEmail from "../../../../use-cases/admin/get-admin-by-email";
import makeIncreaseLoginFailedTimes from "../../../../use-cases/admin/increase-login-failed-times";
import makeResetLoginFailedTimes from "../../../../use-cases/admin/reset-login-failed-times";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeSignInController from "./sign-in";

describe("signIn", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an admin entity and an access token", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const increaseLoginFailedTimes = makeIncreaseLoginFailedTimes({ adminDb });
    const createAdmin = makeCreateAdmin({ adminDb });
    const resetLoginFailedTimes = makeResetLoginFailedTimes({ adminDb });
    const getAdminByEmail = makeGetAdminByEmail({
      adminDb,
    });

    const mock_admin_data = fakeAdmin();

    const hashed_password = await hashPassword({
      password: "qwer1234",
      password_confirmation: "qwer1234",
    });

    const created_admin = await createAdmin({
      ...mock_admin_data,
      hash_password: hashed_password,
    });

    const signInController = makeSignInController({
      getAdminByEmail,
      generateAccessToken,
      verifyPassword,
      increaseLoginFailedTimes,
      resetLoginFailedTimes,
    });

    const request = {
      context: {
        validated: {
          email: created_admin.email,
          password: "qwer1234",
        },
      },
    };

    const result = await signInController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).not.toBe(expected);
  });
});
