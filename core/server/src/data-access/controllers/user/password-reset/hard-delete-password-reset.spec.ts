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
import makeGetPasswordReset from "../../../../use-cases/password-reset/get-password-reset";
import makeHardDeletePasswordReset from "../../../../use-cases/password-reset/hard-delete-password-reset";
import makeHardDeletePasswordResetController from "./hard-delete-password-reset";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import PasswordReset from "../../../../database/entities/password-reset";

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
      moment,
    });

    const createPasswordReset = makeCreatePasswordReset({ passwordResetDb });
    const getPasswordReset = makeGetPasswordReset({
      passwordResetDb,
    });
    const hardDeletePasswordReset = makeHardDeletePasswordReset({
      passwordResetDb,
    });

    const mock_password_reset_data = fakePasswordReset();

    const created_password_reset = await createPasswordReset({
      passwordResetDetails: mock_password_reset_data,
    });

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

    const expected: ExpectSingleResult<PasswordReset> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
