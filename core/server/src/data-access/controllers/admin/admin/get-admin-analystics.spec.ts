import moment from "moment";
import { fakeAdmin } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IAdminAnalyticsData } from "../../../../data-access/interfaces/admin-db";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeGetAdminAnalystics from "../../../../use-cases/admin/get-admin-analystics";
import makeAdminDb from "../../../make-admin-db";
import { AdminModel } from "../../../models";
import makeGetAdminAnalysticsController from "./get-admin-analystics";

describe("getAdminAnalystics", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains analystic data", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const getAdminAnalystics = makeGetAdminAnalystics({
      adminDb,
      randomCacheTime,
      logger,
      redis,
    });

    const mock_admin_data = fakeAdmin();

    await createAdmin(mock_admin_data);

    const getAdminAnalysticsController = makeGetAdminAnalysticsController({
      getAdminAnalystics,
    });

    const request = {
      context: {},
    };

    const result = await getAdminAnalysticsController(request as any);

    const expected: ExpectSingleResult<IAdminAnalyticsData> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
