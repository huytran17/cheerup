import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePasswordReset, fakeUser } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makePasswordResetDb from "../../../make-password-reset-db";
import makeUserDb from "../../../make-user-db";
import { PasswordResetModel, UserModel } from "../../../models";
import makeGetUserByEmail from "../../../../use-cases/user/get-user-by-email";
import makeUpdateUser from "../../../../use-cases/user/update-user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCreatePasswordReset from "../../../../use-cases/password-reset/create-password-reset";
import makeGetPasswordReset from "../../../../use-cases/password-reset/get-password-reset";
import makeHardDeletePasswordReset from "../../../../use-cases/password-reset/hard-delete-password-reset";
import makeResetPasswordController from "./reset-password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  verifyAccessToken,
  generateAccessToken,
} from "../../../../config/accessTokenManager";
import { hashPassword } from "../../../../config/password";
import IUser from "../../../../database/interfaces/user";

describe("resetPassword", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an user entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const passwordResetDb = makePasswordResetDb({
      passwordResetDbModel: PasswordResetModel,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const getUserByEmail = makeGetUserByEmail({ userDb });
    const createUser = makeCreateUser({ userDb });
    const updateUser = makeUpdateUser({ userDb });
    const createPasswordReset = makeCreatePasswordReset({ passwordResetDb });
    const getPasswordReset = makeGetPasswordReset({
      passwordResetDb,
    });
    const hardDeletePasswordReset = makeHardDeletePasswordReset({
      passwordResetDb,
    });

    const mock_password_reset_data = fakePasswordReset();
    const mock_user_data = fakeUser();

    const created_user = await createUser({ userDetails: mock_user_data });

    const created_password_reset = await createPasswordReset({
      passwordResetDetails: {
        ...mock_password_reset_data,
        email: created_user.email,
      },
    });

    const verification_token = await generateAccessToken(
      { _id: created_password_reset._id },
      { expiresIn: "15m" }
    );

    const resetPasswordController = makeResetPasswordController({
      getPasswordReset,
      hardDeletePasswordReset,
      getUserByEmail,
      updateUser,
      verifyAccessToken,
      hashPassword,
    });

    const request = {
      context: {
        validated: {
          password: "qwer1234",
          password_confirmation: "qwer1234",
          verification_token,
        },
      },
    };

    const result = await resetPasswordController(request as any);

    const expected: ExpectSingleResult<IUser> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
