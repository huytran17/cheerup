import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePostBookmark, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeUserDb from "../../../make-user-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import PostBookmark from "../../../../database/entities/post-bookmark";
import { PostBookmarkModel, UserModel } from "../../../models";
import makeHardDeletePostBookmark from "../../../../use-cases/post-bookmark/hard-delete-post-bookmark";
import makeGetPostBookmarkByUserAndPost from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import makeCreatePostBookmark from "../../../../use-cases/post-bookmark/create-post-bookmark";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCreateOrDeletePostBookmark from "./create-or-delete-post-bookmark";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("createOrDeletePostBookmark", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains a post bookmark entity", async () => {
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
      logger,
    });
    const hardDeletePostBookmark = makeHardDeletePostBookmark({
      postBookmarkDb,
      logger,
    });
    const createUser = makeCreateUser({ userDb, logger });
    const getPostBookmarkByUserAndPost = makeGetPostBookmarkByUserAndPost({
      postBookmarkDb,
      logger,
    });

    const mock_post_bookmark_data = fakePostBookmark();
    const mock_user_data = fakeUser();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const countPostBookmarksController = makeCreateOrDeletePostBookmark({
      createPostBookmark,
      hardDeletePostBookmark,
      getPostBookmarkByUserAndPost,
      logger,
      moment,
    });

    const request = {
      context: {
        validated: mock_post_bookmark_data,
        user: created_user,
      },
    };

    const result = await countPostBookmarksController(request as any);

    const expected: ExpectSingleResult<PostBookmark> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
