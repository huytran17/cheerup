import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeSubscription } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makeSubscriptionDb from "../../../make-subscription-db";
import { SubscriptionModel } from "../../../models";
import makeCreateSubscription from "../../../../use-cases/subscription/create-subscription";
import makeGetSubscription from "../../../../use-cases/subscription/get-subscription";
import makeGetSubscriptionController from "./get-subscription";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ISubscription from "../../../../database/interfaces/subscription";

describe("getSubscription", () => {
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
    const getSubscription = makeGetSubscription({ subscriptionDb });

    const mock_subscription_data = fakeSubscription();

    const created_subscription = await createSubscription({
      subscriptionDetails: mock_subscription_data,
    });

    const getSubscriptionController = makeGetSubscriptionController({
      getSubscription,
    });

    const request = {
      context: {
        validated: { subscription_id: created_subscription._id },
      },
    };

    const result = await getSubscriptionController(request as any);

    const expected: ExpectSingleResult<ISubscription> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
