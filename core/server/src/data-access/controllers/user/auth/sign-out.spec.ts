import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { fakeUser } from "../../../../../__tests__/__mock__";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeSignOutController from "./sign-out";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("signOut", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a flag for signed out state", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({ userDbModel: UserModel, moment });

    const createUser = makeCreateUser({ userDb });

    const mock_user_data = fakeUser();
    const created_user = await createUser({ userDetails: mock_user_data });

    const signOutController = makeSignOutController();

    const request = {
      context: {
        user: created_user,
      },
    };

    const result = await signOutController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
