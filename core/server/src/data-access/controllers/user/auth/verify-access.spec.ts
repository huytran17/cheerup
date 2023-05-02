import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeUser } from "../../../../../__tests__/__mock__";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUserByEmail from "../../../../use-cases/user/get-user-by-email";
import makeVerifyAccessController from "./verify-access";
import makeSignInController from "./sign-in";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { verifyAccessToken } from "../../../../config/accessTokenManager";
import { redis } from "../../../../../__tests__/jest-redis";
import { verifyPassword } from "../../../../config/password";
import { generateAccessToken } from "../../../../config/accessTokenManager";

describe("verifyAccess", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that is an decoded JWT token", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({ userDbModel: UserModel, moment });

    const createUser = makeCreateUser({ userDb });
    const getUserByEmail = makeGetUserByEmail({ userDb });

    const mock_user_data = fakeUser();
    const created_user = await createUser({ userDetails: mock_user_data });

    const signInController = makeSignInController({
      getUserByEmail,
      generateAccessToken,
      verifyPassword,
    });

    const sign_in_request = {
      context: {
        validated: {
          email: created_user?.email,
          password: "qwer1234",
        },
      },
    };

    const signed_in_data = await signInController(sign_in_request as any);

    const verifyAccessController = makeVerifyAccessController({
      verifyAccessToken,
      getUserByEmail,
    });

    const verify_access_request = {
      context: {
        validated: {
          access_token: signed_in_data?.body?.data?.access_token,
        },
      },
    };

    const result = await verifyAccessController(verify_access_request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
