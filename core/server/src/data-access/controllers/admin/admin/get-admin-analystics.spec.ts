import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdminAnalystics from "../../../../use-cases/admin/get-admin-analystics";
import makeGetAdminAnalysticsController from "./get-admin-analystics";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IAdminAnalyticsData } from "../../../../data-access/interfaces/admin-db";

describe("getAdminAnalystics", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an admin entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb, logger });
    const getAdminAnalystics = makeGetAdminAnalystics({
      adminDb,
      logger,
      redis,
    });

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({
      adminDetails: mock_admin_data,
    });

    const getAdminAnalysticsController = makeGetAdminAnalysticsController({
      getAdminAnalystics,
    });

    const request = {
      context: {
        validated: created_admin,
      },
    };

    const result = await getAdminAnalysticsController(request as any);

    const expected: ExpectResult<IAdminAnalyticsData> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});