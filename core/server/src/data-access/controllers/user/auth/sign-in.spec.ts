import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
  closeConnection,
} from "../../../../../__tests__/jest-mongo";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeGetUserByEmail from "../../../../use-cases/user/get-user-by-email";
import makeSignInController from "./sign-in";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { verifyPassword } from "../../../../config/password";
import { generateAccessToken } from "../../../../config/accessTokenManager";

describe("signIn", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
    await closeConnection();
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const userDb = makeUserDb({ userDbModel: UserModel, moment });
  const getUserByEmail = makeGetUserByEmail({ userDb });

  const signInController = makeSignInController({
    getUserByEmail,
    generateAccessToken,
    verifyPassword,
    logger,
  });

  const mock_user_data = fakeUser();

  const request = {
    context: {
      validated: {
        email: mock_user_data.email,
        password: "qwert1234",
      },
    },
  };

  it("it should return a body that contains an user entity and an JWT access token", async () => {
    const result = await signInController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: {
        user: result?.body?.data?.user,
        access_token: result?.body?.data?.access_token,
      },
    };

    expect(result).toEqual(expected);
  });

  it("it should return a body that contains an error message when user does not exists", async () => {
    let result = undefined;

    try {
      result = await signInController(request as any);
    } catch (error) {
      result = error;
    }

    const expected = {
      headers,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      body: {
        error: `User by ${mock_user_data.email} does not exist`,
      },
    };

    expect(result).toEqual(expected);
  });

  it("it should return a body that contains an error message when account information is invalid", async () => {
    let result = undefined;

    try {
      result = await signInController(request as any);
    } catch (error) {
      result = error;
    }

    const expected = {
      headers,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      body: {
        error: "Email or password mismatch",
      },
    };

    expect(result).toEqual(expected);
  });
});
