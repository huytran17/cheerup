import moment from "moment";
import { fakeUser } from "../../../../../__tests__/__mock__";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { generateAccessToken } from "../../../../config/accessTokenManager";
import { verifyPassword } from "../../../../config/password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeResetLoginFailedTimes from "../../../../use-cases/user/reset-login-failed-times";
import makeGetUserByEmail from "../../../../use-cases/user/get-user-by-email";
import makeIncreaseLoginFailedTimes from "../../../../use-cases/user/increase-login-failed-times";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeSignInController from "./sign-in";

describe("signIn", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains an user entity and an JWT access token", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({ userDbModel: UserModel, moment });

    const resetLoginFailedTimes = makeResetLoginFailedTimes({ userDb });
    const createUser = makeCreateUser({ userDb });
    const getUserByEmail = makeGetUserByEmail({ userDb });
    const increaseLoginFailedTimes = makeIncreaseLoginFailedTimes({ userDb });

    const mock_user_data = fakeUser();
    const created_user = await createUser(mock_user_data);

    const signInController = makeSignInController({
      getUserByEmail,
      generateAccessToken,
      verifyPassword,
      increaseLoginFailedTimes,
      resetLoginFailedTimes,
    });

    const request = {
      context: {
        validated: {
          email: created_user?.email,
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
