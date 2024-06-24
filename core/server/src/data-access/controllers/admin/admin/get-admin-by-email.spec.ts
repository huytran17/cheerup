import moment from "moment";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdminByEmail from "../../../../use-cases/admin/get-admin-by-email";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeAdminByEmailController from "./get-admin-by-email";

describe("getAdminByEmail", () => {
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
    const getAdminByEmail = makeGetAdminByEmail({
      adminDb,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin(mock_admin_data);

    const getAdminByEmailController = makeAdminByEmailController({
      getAdminByEmail,
    });

    const request = {
      context: {
        validated: created_admin,
      },
    };

    const result = await getAdminByEmailController(request as any);

    const expected: ExpectSingleResult<IAdmin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
