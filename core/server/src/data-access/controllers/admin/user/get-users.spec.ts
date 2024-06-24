import moment from "moment";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import makeGetUsers from "../../../../use-cases/user/get-users";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeGetUsersController from "./get-users";

describe("getUsers", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an user entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const getUsers = makeGetUsers({ userDb });

    const getUsersController = makeGetUsersController({
      getUsers,
    });

    const request = {
      context: {},
    };

    const result = await getUsersController(request as any);

    const expected: ExpectMultipleResults<IUser> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
