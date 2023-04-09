import moment from "moment";

import { fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import PasswordReset from "../../../../database/entities/password-reset";
import makeCreatePasswordReset from "../../../../use-cases/password-reset/create-password-reset";
import makeGetPasswordResetByCode from "../../../../use-cases/password-reset/get-password-reset-by-code";
import makeGetPasswordResetByEmail from "../../../../use-cases/password-reset/get-password-reset-by-email";
import makeHardDeletePasswordReset from "../../../../use-cases/password-reset/hard-delete-password-reset";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUserByEmail from "../../../../use-cases/user/get-user-by-email";
import makePasswordResetDb from "../../../make-password-reset-db";
import makeUserDb from "../../../make-user-db";
import { PasswordResetModel, UserModel } from "../../../models";
import makeCreatePasswordResetController from "./create-password-reset";

describe("createPasswordReset", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

  it("should return a body that contains an password reset entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const passwordResetDb = makePasswordResetDb({
      passwordResetDbModel: PasswordResetModel,
      moment,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createPasswordReset = makeCreatePasswordReset({
      passwordResetDb,
    });
    const getPasswordResetByCode = makeGetPasswordResetByCode({
      passwordResetDb,
    });
    const getPasswordResetByEmail = makeGetPasswordResetByEmail({
      passwordResetDb,
    });
    const hardDeletePasswordReset = makeHardDeletePasswordReset({
      passwordResetDb,
    });
    const createUser = makeCreateUser({ userDb });
    const getUserByEmail = makeGetUserByEmail({ userDb });

    const mock_user_data = fakeUser();

    const created_user = await createUser({ userDetails: mock_user_data });

    const createPasswordResetController = makeCreatePasswordResetController({
      getUserByEmail,
      createPasswordReset,
      getPasswordResetByCode,
      getPasswordResetByEmail,
      hardDeletePasswordReset,
      getEmailContent,
      renderEmailContent,
      sendEmail,
      moment,
      logger,
    });

    const request = {
      context: {
        validated: created_user,
      },
    };

    const result = await createPasswordResetController(request as any);

    const expected: ExpectSingleResult<PasswordReset> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
