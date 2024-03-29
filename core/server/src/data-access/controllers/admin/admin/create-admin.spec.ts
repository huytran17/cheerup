import moment from "moment";
import { merge } from "lodash";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdminByEmail from "../../../../use-cases/admin/get-admin-by-email";
import makeCreateAdminController from "./create-admin";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { hashPassword } from "../../../../config/password";
import IAdmin from "../../../../database/interfaces/admin";

describe("createAdmin", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an admin entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const getAdminByEmail = makeGetAdminByEmail({ adminDb });

    const mock_admin_data = fakeAdmin();

    const createAdminController = makeCreateAdminController({
      createAdmin,
      getAdminByEmail,
      hashPassword,
      logger,
    });

    const password_data = {
      password: "qwer1234",
      password_confirmation: "qwer1234",
    };

    const request = {
      context: {
        validated: merge({}, mock_admin_data, password_data),
      },
    };

    const result = await createAdminController(request as any);

    const expected: ExpectSingleResult<IAdmin> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
