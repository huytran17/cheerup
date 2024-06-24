import moment from "moment";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdmins from "../../../../use-cases/admin/get-admins";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeGetAdminsController from "./get-admins";

describe("getAdmins", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an array of admin entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const getAdmins = makeGetAdmins({
      adminDb,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin(mock_admin_data);

    const getAdminsController = makeGetAdminsController({
      getAdmins,
    });

    const request = {
      context: {
        validated: created_admin._id,
      },
    };

    const result = await getAdminsController(request as any);

    const expected: ExpectMultipleResults<IAdmin> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
