import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePostBookmark, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeUserDb from "../../../make-user-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import PostBookmark from "../../../../database/entities/post-bookmark";
import { PostBookmarkModel, UserModel } from "../../../models";
import makeCountPostBookmarks from "../../../../use-cases/post-bookmark/count-post-bookmarks";
import makeCreatePostBookmark from "../../../../use-cases/post-bookmark/create-post-bookmark";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCountPostBookmarksController from "./count-post-bookmarks";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("countPostBookmarks", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a number of post bookmarks", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postBookmarkDb = makePostBookmarkDb({
      postBookmarkDbModel: PostBookmarkModel,
      moment,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createPostBookmark = makeCreatePostBookmark({
      postBookmarkDb,
    });
    const getUser = makeGetUser({ userDb, logger });
    const createUser = makeCreateUser({ userDb });
    const countPostBookmarks = makeCountPostBookmarks({
      postBookmarkDb,
    });

    const mock_post_bookmark_data = fakePostBookmark();
    const mock_user_data = fakeUser();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    await createPostBookmark({
      postBookmarkDetails: {
        ...mock_post_bookmark_data,
        user: created_user,
      },
    });

    const countPostBookmarksController = makeCountPostBookmarksController({
      countPostBookmarks,
      getUser,
    });

    const request = {
      context: {
        user: created_user,
      },
    };

    const result = await countPostBookmarksController(request as any);

    const expected: ExpectSingleResult<number> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
