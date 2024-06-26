import moment from "moment";
import { fakeUser } from "../../../../../__tests__/__mock__";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeSignOutController from "./sign-out";

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
    const created_user = await createUser(mock_user_data);

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
