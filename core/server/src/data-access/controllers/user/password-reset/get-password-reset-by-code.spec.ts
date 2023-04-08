import moment from "moment";

import { fakePasswordReset } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { generateAccessToken } from "../../../../config/accessTokenManager";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import PasswordReset from "../../../../database/entities/password-reset";
import makeCreatePasswordReset from "../../../../use-cases/password-reset/create-password-reset";
import makeGetPasswordResetByCode from "../../../../use-cases/password-reset/get-password-reset-by-code";
import makePasswordResetDb from "../../../make-password-reset-db";
import { PasswordResetModel } from "../../../models";
import makeGetPasswordResetByCodeController from "./get-password-reset-by-code";

describe("getPasswordResetByCode", () => {
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

    const createPasswordReset = makeCreatePasswordReset({ passwordResetDb });
    const getPasswordResetByCode = makeGetPasswordResetByCode({
      passwordResetDb,
    });

    const mock_password_reset_data = fakePasswordReset();

    const created_password_reset = await createPasswordReset({
      passwordResetDetails: mock_password_reset_data,
    });

    const getPasswordResetByCodeController =
      makeGetPasswordResetByCodeController({
        getPasswordResetByCode,
        generateAccessToken,
        moment,
      });

    const request = {
      context: {
        validated: created_password_reset,
      },
    };

    const result = await getPasswordResetByCodeController(request as any);

    const expected: ExpectSingleResult<PasswordReset> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
