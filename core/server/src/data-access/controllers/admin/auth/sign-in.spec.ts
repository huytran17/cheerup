import moment from "moment";
import { omit } from "lodash";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingedInResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeGetAdminByEmail from "../../../../use-cases/admin/get-admin-by-email";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeSignInController from "./sign-in";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Admin from "../../../../database/entities/admin";
import { generateAccessToken } from "../../../../config/accessTokenManager";
import { hashPassword, verifyPassword } from "../../../../config/password";

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

    const createAdmin = makeCreateAdmin({ adminDb });
    const getAdminByEmail = makeGetAdminByEmail({
      adminDb,
    });

    const mock_admin_data = fakeAdmin();

    const hashed_password = await hashPassword({
      password: "qwer1234",
      password_confirmation: "qwer1234",
    });

    const created_admin = await createAdmin({
      adminDetails: { ...mock_admin_data, hash_password: hashed_password },
    });

    const signInController = makeSignInController({
      getAdminByEmail,
      generateAccessToken,
      verifyPassword,
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
      body: {
        user: omit(result?.body?.data?.user, "hash_password"),
        access_token: result?.body?.data?.access_token,
      },
    };

    expect(result).toEqual(expected);
  });
});
