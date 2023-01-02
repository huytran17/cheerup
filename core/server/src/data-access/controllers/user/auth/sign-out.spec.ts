import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeUser } from "../../../../../__tests__/__mock__";
import makeUserDb from "../../../make-user-db";
import { UserModel } from "../../../models";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUserByEmail from "../../../../use-cases/user/get-user-by-email";
import makeSignOutController from "./sign-out";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("signOut", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains a flag for signed out state", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const userDb = makeUserDb({ userDbModel: UserModel, moment });

    const createUser = makeCreateUser({ userDb });
    const getUserByEmail = makeGetUserByEmail({ userDb });

    const mock_user_data = fakeUser();
    const created_user = await createUser({ userDetails: mock_user_data });

    const signOutController = makeSignOutController({
      getUserByEmail,
    });

    const request = {
      context: {
        user: {
          email: created_user.email,
        },
      },
    };

    const result = await signOutController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: {
        data: {
          valid_signout: result?.body?.data?.valid_signout,
        },
      },
    };

    expect(result).toEqual(expected);
  });
});
