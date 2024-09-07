import moment from "moment";
import { fakeSubscription } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateSubscription from "../../../../use-cases/subscription/create-subscription";
import makeGetSubscriptionAnalystics from "../../../../use-cases/subscription/get-subscription-analystics";
import { ISubscriptionAnalyticsData } from "../../../interfaces/subscription-db";
import makeSubscriptionDb from "../../../make-subscription-db";
import { SubscriptionModel } from "../../../models";
import makeGetSubscriptionAnalysticsController from "./get-subscription-analystics";

describe("getSubscriptionAnalystics", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an subscription entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const subscriptionDb = makeSubscriptionDb({
      subscriptionDbModel: SubscriptionModel,
      moment,
    });

    const createSubscription = makeCreateSubscription({
      subscriptionDb,
    });
    const getSubscriptionAnalystics = makeGetSubscriptionAnalystics({
      subscriptionDb,
      randomCacheTime,
      redis,
      logger,
    });

    const mock_subscription_data = fakeSubscription();

    await createSubscription(mock_subscription_data);

    const getSubscriptionAnalysticsController =
      makeGetSubscriptionAnalysticsController({
        getSubscriptionAnalystics,
      });

    const request = {
      context: {},
    };

    const result = await getSubscriptionAnalysticsController(request as any);

    const expected: ExpectSingleResult<ISubscriptionAnalyticsData> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
