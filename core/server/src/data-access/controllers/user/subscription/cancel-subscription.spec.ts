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
import makeGetSubscriptionByEmail from "../../../../use-cases/subscription/get-subscription-by-email";
import makeUpdateSubscription from "../../../../use-cases/subscription/update-subscription";
import makeCancelSubscriptionController from "./cancel-subscription";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Subscription from "../../../../database/entities/subscription";

describe("cancelSubscription", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains a subscription entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const subscriptionDb = makeSubscriptionDb({
      subscriptionDbModel: SubscriptionModel,
      moment,
    });

    const getSubscriptionByEmail = makeGetSubscriptionByEmail({
      subscriptionDb,
    });
    const updateSubscription = makeUpdateSubscription({
      subscriptionDb,
    });
    const createSubscription = makeCreateSubscription({
      subscriptionDb,
    });

    const mock_subscription_data = fakeSubscription();

    const created_subscription = await createSubscription({
      subscriptionDetails: mock_subscription_data,
    });

    const cancelSubscriptionController = makeCancelSubscriptionController({
      getSubscriptionByEmail,
      updateSubscription,
    });

    const request = {
      context: {
        user: {
          email: created_subscription.email,
        },
      },
    };

    const result = await cancelSubscriptionController(request as any);

    const expected: ExpectSingleResult<Subscription> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
