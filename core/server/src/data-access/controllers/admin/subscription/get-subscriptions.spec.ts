import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakeSubscription } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeSubscriptionDb from "../../../make-subscription-db";
import { SubscriptionModel } from "../../../models";
import makeCreateSubscription from "../../../../use-cases/subscription/create-subscription";
import makeGetSubscriptions from "../../../../use-cases/subscription/get-subscriptions";
import makeGetSubscriptionsController from "./get-subscriptions";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Subscription from "../../../../database/entities/subscription";

describe("getSubscriptions", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

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
    const getSubscriptions = makeGetSubscriptions({ subscriptionDb, logger });

    const mock_subscription_data = fakeSubscription();

    const created_subscription = await createSubscription({
      subscriptionDetails: mock_subscription_data,
    });

    const getSubscriptionsController = makeGetSubscriptionsController({
      getSubscriptions,
    });

    const request = {
      context: {
        validated: { subscription_id: created_subscription._id },
      },
    };

    const result = await getSubscriptionsController(request as any);

    const expected: ExpectMultipleResults<Subscription> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
