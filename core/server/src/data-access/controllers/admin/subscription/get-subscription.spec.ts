import moment from "moment";
import { fakeSubscription } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ISubscription from "../../../../database/interfaces/subscription";
import makeCreateSubscription from "../../../../use-cases/subscription/create-subscription";
import makeGetSubscription from "../../../../use-cases/subscription/get-subscription";
import makeSubscriptionDb from "../../../make-subscription-db";
import { SubscriptionModel } from "../../../models";
import makeGetSubscriptionController from "./get-subscription";

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

    const created_subscription = await createSubscription(
      mock_subscription_data
    );

    const getSubscriptionController = makeGetSubscriptionController({
      getSubscription,
    });

    const request = {
      context: {
        validated: { _id: created_subscription._id },
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
