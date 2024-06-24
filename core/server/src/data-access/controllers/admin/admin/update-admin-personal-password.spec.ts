import moment from "moment";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { hashPassword, verifyPassword } from "../../../../config/password";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdmin from "../../../../use-cases/admin/get-admin";
import makeUpdateAdmin from "../../../../use-cases/admin/update-admin";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeUpdateAdminPersonalAdminController from "./update-admin-personal-password";

describe("updateAdminPassword", () => {
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
    const updateAdmin = makeUpdateAdmin({ adminDb });
    const getAdmin = makeGetAdmin({
      adminDb,
    });

    const mock_admin_data = fakeAdmin();

    const hashed_password = await hashPassword({
      password: "qwer1234",
      password_confirmation: "qwer1234",
    });

    const created_admin = await createAdmin({
      ...mock_admin_data,
      hash_password: hashed_password,
    });

    const updateAdminPersonalAdminController =
      makeUpdateAdminPersonalAdminController({
        getAdmin,
        updateAdmin,
        hashPassword,
        verifyPassword,
        logger,
      });

    const request = {
      context: {
        validated: {
          _id: created_admin._id,
          password: "qwer1234",
          new_password: "new_password",
          new_password_confirmation: "new_password",
        },
      },
    };

    const result = await updateAdminPersonalAdminController(request as any);

    const expected: ExpectSingleResult<IAdmin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
