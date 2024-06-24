import moment from "moment";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { hashPassword } from "../../../../config/password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdminByEmail from "../../../../use-cases/admin/get-admin-by-email";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeCreateAdminController from "./create-admin";

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
        validated: { ...mock_admin_data, ...password_data },
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
