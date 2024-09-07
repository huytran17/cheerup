import moment from "moment";
import { fakeSubscription } from "../../../../../__tests__/__mock__";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ISubscription from "../../../../database/interfaces/subscription";
import makeCreateSubscription from "../../../../use-cases/subscription/create-subscription";
import makeGetSubscriptions from "../../../../use-cases/subscription/get-subscriptions";
import makeSubscriptionDb from "../../../make-subscription-db";
import { SubscriptionModel } from "../../../models";
import makeGetSubscriptionsController from "./get-subscriptions";

describe("getSubscriptions", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an array of subscription entities", async () => {
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
    const getSubscriptions = makeGetSubscriptions({
      subscriptionDb,
      randomCacheTime,
      redis,
      logger,
    });

    const mock_subscription_data = fakeSubscription();

    const created_subscription = await createSubscription(
      mock_subscription_data
    );

    const getSubscriptionsController = makeGetSubscriptionsController({
      getSubscriptions,
    });

    const request = {
      context: {
        validated: { subscription_id: created_subscription._id },
      },
    };

    const result = await getSubscriptionsController(request as any);

    const expected: ExpectMultipleResults<ISubscription> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
