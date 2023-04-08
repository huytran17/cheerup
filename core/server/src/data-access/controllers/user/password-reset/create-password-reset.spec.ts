import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePasswordReset, fakeUser } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import { logger } from "../../../../../__tests__/jest-logger";
import makePasswordResetDb from "../../../make-password-reset-db";
import makeUserDb from "../../../make-user-db";
import { PasswordResetModel, UserModel } from "../../../models";
import makeCreatePasswordReset from "../../../../use-cases/password-reset/create-password-reset";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCreatePasswordResetController from "./create-password-reset";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import PasswordReset from "../../../../database/entities/password-reset";

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
    const createUser = makeCreateUser({ userDb });

    const mock_password_reset_data = fakePasswordReset();
    const mock_user_data = fakeUser();

    const created_user = await createUser({ userDetails: mock_user_data });

    const createPasswordResetController = makeCreatePasswordResetController({
      createPasswordReset,
      getEmailContent,
      renderEmailContent,
      sendEmail,
      moment,
      logger,
    });

    const request = {
      context: {
        validated: mock_password_reset_data,
        user: created_user,
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
