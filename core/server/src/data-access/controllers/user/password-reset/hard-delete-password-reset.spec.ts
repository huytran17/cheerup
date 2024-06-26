import { fakePasswordReset } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPasswordReset from "../../../../database/interfaces/password-reset";
import makeCreatePasswordReset from "../../../../use-cases/password-reset/create-password-reset";
import makeGetPasswordReset from "../../../../use-cases/password-reset/get-password-reset";
import makeHardDeletePasswordReset from "../../../../use-cases/password-reset/hard-delete-password-reset";
import makePasswordResetDb from "../../../make-password-reset-db";
import { PasswordResetModel } from "../../../models";
import makeHardDeletePasswordResetController from "./hard-delete-password-reset";

describe("hardDeletePasswordReset", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an passwordReset entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const passwordResetDb = makePasswordResetDb({
      passwordResetDbModel: PasswordResetModel,
    });

    const createPasswordReset = makeCreatePasswordReset({ passwordResetDb });
    const getPasswordReset = makeGetPasswordReset({
      passwordResetDb,
    });
    const hardDeletePasswordReset = makeHardDeletePasswordReset({
      passwordResetDb,
    });

    const mock_password_reset_data = fakePasswordReset();

    const created_password_reset = await createPasswordReset(
      mock_password_reset_data
    );

    const hardDeletPasswordResetController =
      makeHardDeletePasswordResetController({
        getPasswordReset,
        hardDeletePasswordReset,
      });

    const request = {
      context: {
        validated: created_password_reset,
      },
    };

    const result = await hardDeletPasswordResetController(request as any);

    const expected: ExpectSingleResult<IPasswordReset> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
