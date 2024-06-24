import moment from "moment";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { hashPassword } from "../../../../config/password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeResetLoginFailedTimes from "../../../../use-cases/user/reset-login-failed-times";
import makeUpdateUser from "../../../../use-cases/user/update-user";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeUpdateUserPasswordController from "./update-user-password";

describe("updateUserPassword", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an user entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb });
    const getUser = makeGetUser({ userDb });
    const updateUser = makeUpdateUser({ userDb });
    const resetLoginFailedTimes = makeResetLoginFailedTimes({ userDb });

    const mock_user_data = fakeUser();
    const created_user = await createUser(mock_user_data);

    const updateUserPasswordController = makeUpdateUserPasswordController({
      getUser,
      updateUser,
      hashPassword,
      resetLoginFailedTimes,
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

    const expected: ExpectSingleResult<IUser> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
