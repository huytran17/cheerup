import moment from "moment";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { hashPassword, verifyPassword } from "../../../../config/password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeUpdateUser from "../../../../use-cases/user/update-user";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeUpdatePasswordController from "./update-password";

describe("updatePassword", () => {
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
    const updateUser = makeUpdateUser({ userDb });

    const mock_user_data = fakeUser();

    const hashed_password = await hashPassword({
      password: "password",
      password_confirmation: "password",
    });

    const created_user = await createUser({
      ...mock_user_data,
      hash_password: hashed_password,
    });

    const updatePasswordController = makeUpdatePasswordController({
      updateUser,
      hashPassword,
      verifyPassword,
      logger,
    });

    const request = {
      context: {
        validated: {
          password: "password",
          new_password: "new_password",
          new_password_confirmation: "new_password",
        },
        user: created_user,
      },
    };

    const result = await updatePasswordController(request as any);

    const expected: ExpectSingleResult<IUser> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
