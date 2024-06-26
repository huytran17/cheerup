import moment from "moment";
import { fakePostBookmark, fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCountPostBookmarks from "../../../../use-cases/post-bookmark/count-post-bookmarks";
import makeCreatePostBookmark from "../../../../use-cases/post-bookmark/create-post-bookmark";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import makeUserDb from "../../../make-user-db";
import { PostBookmarkModel, UserModel } from "../../../models";
import makeCountPostBookmarksController from "./count-post-bookmarks";

describe("countPostBookmarks", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a number of post bookmarks", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postBookmarkDb = makePostBookmarkDb({
      postBookmarkDbModel: PostBookmarkModel,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createPostBookmark = makeCreatePostBookmark({
      postBookmarkDb,
    });
    const createUser = makeCreateUser({ userDb });
    const countPostBookmarks = makeCountPostBookmarks({
      postBookmarkDb,
    });

    const mock_post_bookmark_data = fakePostBookmark();
    const mock_user_data = fakeUser();

    const created_user = await createUser(mock_user_data);
    await createPostBookmark({
      ...mock_post_bookmark_data,
      user: created_user,
    });

    const countPostBookmarksController = makeCountPostBookmarksController({
      countPostBookmarks,
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
