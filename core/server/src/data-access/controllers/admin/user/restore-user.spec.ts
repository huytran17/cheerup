import moment from "moment";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetSoftDeletedUser from "../../../../use-cases/user/get-soft-deleted-user";
import makeRestoreUser from "../../../../use-cases/user/restore-user";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeRestoreUserController from "./restore-user";

describe("restoreUser", () => {
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

    const createUser = makeCreateUser({ userDb });
    const getSoftDeletedUser = makeGetSoftDeletedUser({ userDb });
    const restoreUser = makeRestoreUser({ userDb });

    const mock_user_data = fakeUser();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const restoreUserController = makeRestoreUserController({
      getSoftDeletedUser,
      restoreUser,
      logger,
    });

    const request = {
      context: {
        validated: created_user,
      },
    };

    const result = await restoreUserController(request as any);

    const expected: ExpectSingleResult<IUser> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
