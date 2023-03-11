import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeDeleteUser from "../../../../use-cases/user/delete-user";
import makeGetUserController from "./get-user";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import User from "../../../../database/entities/user";

describe("deleteUser", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an user entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb, logger });
    const deleteUser = makeDeleteUser({ userDb, logger });
    const getUser = makeGetUser({
      userDb,
      logger,
    });

    const mock_user_data = fakeUser();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const getUserController = makeGetUserController({
      getUser,
      deleteUser,
      logger,
    });

    const request = {
      context: {
        validated: created_user,
      },
    };

    const result = await getUserController(request as any);

    const expected: ExpectSingleResult<User> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
