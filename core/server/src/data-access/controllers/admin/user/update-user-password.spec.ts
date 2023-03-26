import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { hashPassword } from "../../../../config/password";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeUpdateUser from "../../../../use-cases/user/update-user";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeUpdateUserPasswordController from "./update-user-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import User from "../../../../database/entities/user";

describe("updateUserPassword", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnectRedis()]);
  });

  it("should return a body that contains an user entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb, logger });
    const getUser = makeGetUser({ userDb, logger });
    const updateUser = makeUpdateUser({ userDb, logger });

    const mock_user_data = fakeUser();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const updateUserPasswordController = makeUpdateUserPasswordController({
      getUser,
      updateUser,
      hashPassword,
      logger,
    });

    const request = {
      context: {
        validated: {
          ...created_user,
          password: "qwer1234",
          password_confirmation: "qwer1234",
        },
      },
    };

    const result = await updateUserPasswordController(request as any);

    const expected: ExpectSingleResult<User> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
