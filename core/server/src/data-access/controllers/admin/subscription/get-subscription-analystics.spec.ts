import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeSubscription } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeSubscriptionDb from "../../../make-subscription-db";
import { SubscriptionModel } from "../../../models";
import makeCreateSubscription from "../../../../use-cases/subscription/create-subscription";
import makeGetSubscriptionAnalystics from "../../../../use-cases/subscription/get-subscription-analystics";
import makeGetSubscriptionAnalysticsController from "./get-subscription-analystics";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { ISubscriptionAnalyticsData } from "../../../interfaces/subscription-db";

describe("getSubscriptionAnalystics", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

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
      logger,
    });
    const getSubscriptionAnalystics = makeGetSubscriptionAnalystics({
      subscriptionDb,
      logger,
      redis,
    });

    const mock_subscription_data = fakeSubscription();

    await createSubscription({
      subscriptionDetails: mock_subscription_data,
    });

    const getSubscriptionAnalysticsController =
      makeGetSubscriptionAnalysticsController({
        getSubscriptionAnalystics,
      });

    const request = {
      context: {
        validated: {},
      },
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
