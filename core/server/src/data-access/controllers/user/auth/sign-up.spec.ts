import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUserByEmail from "../../../../use-cases/user/get-user-by-email";
import makeSignUpController from "./sign-up";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { hashPassword } from "../../../../config/password";

describe("signUp", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnectRedis()]);
  });

  it("it should return a body that is an object of the user entity class", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({ userDbModel: UserModel, moment });

    const createUser = makeCreateUser({ userDb });
    const getUserByEmail = makeGetUserByEmail({ userDb });

    const signUpController = makeSignUpController({
      createUser,
      getUserByEmail,
      hashPassword,
      logger,
    });

    const mock_user_data = fakeUser();

    const request = {
      context: {
        validated: {
          email: mock_user_data.email,
          password: "qwert1234",
          password_confirmation: "qwert1234",
        },
        ip: mock_user_data.ip,
      },
    };

    const result = await signUpController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
