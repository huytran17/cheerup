import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeUserDb from "../../../make-user-db";
import makeSubscriptionDb from "../../../make-subscription-db";
import { UserModel, SubscriptionModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeGetSubscriptionByEmail from "../../../../use-cases/subscription/get-subscription-by-email";
import makeUpdateUser from "../../../../use-cases/user/update-user";
import makeGetMeController from "./get-me";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getMe", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

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
    const getUser = makeGetUser({ userDb, logger });
    const updateUser = makeUpdateUser({ userDb, logger });
    const getSubscriptionByEmail = makeGetSubscriptionByEmail({
      subscriptionDb,
      logger,
    });

    const mock_user_data = fakeUser();
    const created_user = await createUser({ userDetails: mock_user_data });

    const getMeController = makeGetMeController({
      getUser,
      updateUser,
      getSubscriptionByEmail,
    });

    const request = {
      context: {
        user: {
          _id: created_user._id,
          email: created_user.email,
          ip: created_user.ip,
        },
      },
    };

    const result = await getMeController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: {
        data: result?.body?.data,
      },
    };

    expect(result).toEqual(expected);
  });
});