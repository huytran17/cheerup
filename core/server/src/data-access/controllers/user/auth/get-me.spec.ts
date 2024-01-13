import moment from "moment";
import { fakeUser } from "../../../../../__tests__/__mock__";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeGetSubscriptionByEmail from "../../../../use-cases/subscription/get-subscription-by-email";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeUpdateUser from "../../../../use-cases/user/update-user";
import makeSubscriptionDb from "../../../make-subscription-db";
import makeUserDb from "../../../make-user-db";
import { SubscriptionModel, UserModel } from "../../../models";
import makeGetMeController from "./get-me";

describe("getMe", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains an user object", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({ userDbModel: UserModel, moment });
    const subscriptionDb = makeSubscriptionDb({
      subscriptionDbModel: SubscriptionModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb });
    const updateUser = makeUpdateUser({ userDb });
    const getSubscriptionByEmail = makeGetSubscriptionByEmail({
      subscriptionDb,
    });

    const mock_user_data = fakeUser();
    const created_user = await createUser({ userDetails: mock_user_data });

    const getMeController = makeGetMeController({
      updateUser,
      getSubscriptionByEmail,
    });

    const request = {
      context: {
        user: created_user,
      },
    };

    const result = await getMeController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
