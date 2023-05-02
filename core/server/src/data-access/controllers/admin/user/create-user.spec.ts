import moment from "moment";
import { hashPassword } from "../../../../config/password";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeUserDb from "../../../make-user-db";
import makeAdminDb from "../../../make-admin-db";
import { UserModel, AdminModel } from "../../../models";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUserByEmail from "../../../../use-cases/user/get-user-by-email";
import makeCreateUserController from "./create-user";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import User from "../../../../database/entities/user";

describe("createUser", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

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
    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const createUser = makeCreateUser({ userDb });
    const getUserByEmail = makeGetUserByEmail({ userDb });

    const mock_user_data = fakeUser();
    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({
      adminDetails: mock_admin_data,
    });

    const createUserController = makeCreateUserController({
      createUser,
      getUserByEmail,
      hashPassword,
      logger,
    });

    const request = {
      context: {
        validated: {
          ...mock_user_data,
          password: "qwer1234",
          password_confirmation: "qwer1234",
        },
        user: created_admin,
      },
    };

    const result = await createUserController(request as any);

    const expected: ExpectSingleResult<User> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
