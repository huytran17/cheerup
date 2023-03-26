import moment from "moment";
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
import makeVerifyAccessController from "./verify-access";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { JwtPayload } from "jsonwebtoken";
import {
  verifyAccessToken,
  generateAccessToken,
} from "../../../../config/accessTokenManager";

describe("getMe", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnectRedis()]);
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

    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({
      adminDetails: mock_admin_data,
    });

    const verifyAccessController = makeVerifyAccessController({
      verifyAccessToken,
    });

    const access_token = await generateAccessToken({
      email: created_admin.email,
    });

    const request = {
      context: {
        validated: {
          access_token,
        },
      },
    };

    const result = await verifyAccessController(request as any);

    const expected: ExpectSingleResult<string | JwtPayload> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
