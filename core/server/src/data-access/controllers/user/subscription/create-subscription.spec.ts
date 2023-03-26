import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeSubscriptionDb from "../../../make-subscription-db";
import makeUserDb from "../../../make-user-db";
import { SubscriptionModel, UserModel } from "../../../models";
import makeCreateSubscription from "../../../../use-cases/subscription/create-subscription";
import makeGetSubscriptionByEmail from "../../../../use-cases/subscription/get-subscription-by-email";
import makeUpdateSubscription from "../../../../use-cases/subscription/update-subscription";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCreateSubscriptionController from "./create-subscription";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Subscription from "../../../../database/entities/subscription";

describe("createSubscription", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnectRedis()]);
  });

  it("should return a body that contains a subscription entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const subscriptionDb = makeSubscriptionDb({
      subscriptionDbModel: SubscriptionModel,
      moment,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb, logger });
    const getSubscriptionByEmail = makeGetSubscriptionByEmail({
      subscriptionDb,
      logger,
    });
    const updateSubscription = makeUpdateSubscription({
      subscriptionDb,
      logger,
    });
    const createSubscription = makeCreateSubscription({
      subscriptionDb,
      logger,
    });

    const mock_user_data = fakeUser();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const createSubscriptionController = makeCreateSubscriptionController({
      createSubscription,
      getSubscriptionByEmail,
      updateSubscription,
      logger,
    });

    const request = {
      context: {
        validated: {
          is_active: true,
        },
        user: {
          email: created_user.email,
        },
      },
    };

    const result = await createSubscriptionController(request as any);

    const expected: ExpectSingleResult<Subscription> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
