import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePasswordReset } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makePasswordResetDb from "../../../make-password-reset-db";
import { PasswordResetModel } from "../../../models";
import makeCreatePasswordReset from "../../../../use-cases/password-reset/create-password-reset";
import makeGetPasswordResetByEmailAndCode from "../../../../use-cases/password-reset/get-by-email-and-code";
import makeGetPasswordResetController from "./get-password-reset-by-email-and-code";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import PasswordReset from "../../../../database/entities/password-reset";

describe("getByEmailAndCode", () => {
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
    const getByEmailAndCode = makeGetPasswordResetByEmailAndCode({
      passwordResetDb,
    });

    const mock_password_reset_data = fakePasswordReset();

    const created_gallery = await createPasswordReset({
      passwordResetDetails: mock_password_reset_data,
    });

    const getPasswordResetController = makeGetPasswordResetController({
      getByEmailAndCode,
    });

    const request = {
      context: {
        validated: created_gallery,
      },
    };

    const result = await getPasswordResetController(request as any);

    const expected: ExpectSingleResult<PasswordReset> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
