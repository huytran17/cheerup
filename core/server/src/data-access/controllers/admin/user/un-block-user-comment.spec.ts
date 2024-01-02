import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeUpdateUser from "../../../../use-cases/user/update-user";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeUnBlockUserCommentController from "./un-block-user-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IUser from "../../../../database/interfaces/user";

describe("unBlockUserComment", () => {
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
    const getUser = makeGetUser({ userDb });
    const updateUser = makeUpdateUser({ userDb });

    const mock_user_data = fakeUser();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const unblockUserCommentController = makeUnBlockUserCommentController({
      getUser,
      updateUser,
      logger,
    });

    const request = {
      context: {
        validated: created_user,
      },
    };

    const result = await unblockUserCommentController(request as any);

    const expected: ExpectSingleResult<IUser> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
