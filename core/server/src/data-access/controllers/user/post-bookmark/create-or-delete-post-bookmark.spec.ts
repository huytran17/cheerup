import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  fakePostBookmark,
  fakeUser,
  fakePost,
} from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeUserDb from "../../../make-user-db";
import makePostDb from "../../../make-post-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import PostBookmark from "../../../../database/entities/post-bookmark";
import { PostBookmarkModel, UserModel, PostModel } from "../../../models";
import makeHardDeletePostBookmark from "../../../../use-cases/post-bookmark/hard-delete-post-bookmark";
import makeGetPostBookmarkByUserAndPost from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import makeCreatePostBookmark from "../../../../use-cases/post-bookmark/create-post-bookmark";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCreateOrDeletePostBookmark from "./create-or-delete-post-bookmark";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("createOrDeletePostBookmark", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a post bookmark entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postBookmarkDb = makePostBookmarkDb({
      postBookmarkDbModel: PostBookmarkModel,
      moment,
    });
    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createPostBookmark = makeCreatePostBookmark({
      postBookmarkDb,
    });
    const hardDeletePostBookmark = makeHardDeletePostBookmark({
      postBookmarkDb,
    });
    const createUser = makeCreateUser({ userDb });
    const getUser = makeGetUser({ userDb, logger });
    const getPost = makeGetPost({ postDb, logger });
    const createPost = makeCreatePost({ postDb });
    const getPostBookmarkByUserAndPost = makeGetPostBookmarkByUserAndPost({
      postBookmarkDb,
    });

    const mock_post_bookmark_data = fakePostBookmark();
    const mock_user_data = fakeUser();
    const mock_post_data = fakePost();

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const countPostBookmarksController = makeCreateOrDeletePostBookmark({
      createPostBookmark,
      hardDeletePostBookmark,
      getPostBookmarkByUserAndPost,
      getUser,
      getPost,
      moment,
    });

    const request = {
      context: {
        validated: { ...mock_post_bookmark_data, post: created_post },
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
