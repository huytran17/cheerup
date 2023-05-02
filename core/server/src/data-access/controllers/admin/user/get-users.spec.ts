import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeGetUsers from "../../../../use-cases/user/get-users";
import makeGetUsersController from "./get-users";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import User from "../../../../database/entities/user";

describe("getUsers", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

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

    const getUsers = makeGetUsers({ userDb, logger });

    const getUsersController = makeGetUsersController({
      getUsers,
    });

    const request = {
      context: {
        validated: {},
      },
    };

    const result = await getUsersController(request as any);

    const expected: ExpectMultipleResults<User> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
