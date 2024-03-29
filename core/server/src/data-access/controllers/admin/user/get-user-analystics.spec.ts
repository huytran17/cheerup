import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUserAnalystics from "../../../../use-cases/user/get-user-analystics";
import makeGetUserAnalysticsController from "./get-user-analystics";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IUserAnalyticsData } from "../../../interfaces/user-db";

describe("getUserAnalystics", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains analystic data", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb });
    const getUserAnalystics = makeGetUserAnalystics({ userDb, logger, redis });

    const mock_user_data = fakeUser();

    await createUser({
      userDetails: mock_user_data,
    });

    const getUserAnalysticsController = makeGetUserAnalysticsController({
      getUserAnalystics,
    });

    const request = {
      context: {},
    };

    const result = await getUserAnalysticsController(request as any);

    const expected: ExpectSingleResult<IUserAnalyticsData> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
