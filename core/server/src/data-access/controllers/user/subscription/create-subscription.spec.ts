import moment from "moment";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ISubscription from "../../../../database/interfaces/subscription";
import makeCreateSubscription from "../../../../use-cases/subscription/create-subscription";
import makeGetSubscriptionByEmail from "../../../../use-cases/subscription/get-subscription-by-email";
import makeUpdateSubscription from "../../../../use-cases/subscription/update-subscription";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeSubscriptionDb from "../../../make-subscription-db";
import makeUserDb from "../../../make-user-db";
import { SubscriptionModel, UserModel } from "../../../models";
import makeCreateSubscriptionController from "./create-subscription";

describe("createSubscription", () => {
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
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb });
    const getSubscriptionByEmail = makeGetSubscriptionByEmail({
      subscriptionDb,
    });
    const updateSubscription = makeUpdateSubscription({
      subscriptionDb,
    });
    const createSubscription = makeCreateSubscription({
      subscriptionDb,
    });

    const mock_user_data = fakeUser();

    const created_user = await createUser(mock_user_data);

    const createSubscriptionController = makeCreateSubscriptionController({
      createSubscription,
      getSubscriptionByEmail,
      updateSubscription,
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

    const expected: ExpectSingleResult<ISubscription> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
