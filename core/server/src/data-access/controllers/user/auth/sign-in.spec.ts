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
import makeCreateUser from "../../../../use-cases/user/create-user";
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

  it("it should return a body that contains an user entity and an JWT access token", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({ userDbModel: UserModel, moment });
    const createUser = makeCreateUser({ userDb });
    const getUserByEmail = makeGetUserByEmail({ userDb });

    const mock_user_data = fakeUser();
    await createUser({ userDetails: mock_user_data });

    const signInController = makeSignInController({
      getUserByEmail,
      generateAccessToken,
      verifyPassword,
      logger,
    });

    const request = {
      context: {
        validated: {
          email: mock_user_data.email,
          password: "qwer1234",
        },
      },
    };

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
});
