import moment from "moment";
import {
  fakePost,
  fakePostBookmark,
  fakeUser,
} from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPostBookmark from "../../../../database/interfaces/post-bookmark";
import makeCreatePostBookmark from "../../../../use-cases/post-bookmark/create-post-bookmark";
import makeGetPostBookmarkByUserAndPost from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import makeHardDeletePostBookmark from "../../../../use-cases/post-bookmark/hard-delete-post-bookmark";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import { PostBookmarkModel, PostModel, UserModel } from "../../../models";
import makeCreateOrDeletePostBookmark from "./create-or-delete-post-bookmark";

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
    const getPost = makeGetPost({ postDb });
    const createPost = makeCreatePost({ postDb });
    const getPostBookmarkByUserAndPost = makeGetPostBookmarkByUserAndPost({
      postBookmarkDb,
    });

    const mock_post_bookmark_data = fakePostBookmark();
    const mock_user_data = fakeUser();
    const mock_post_data = fakePost();

    const [created_user, created_post] = await Promise.all([
      createUser(mock_user_data),
      createPost(mock_post_data),
    ]);

    const countPostBookmarksController = makeCreateOrDeletePostBookmark({
      createPostBookmark,
      hardDeletePostBookmark,
      getPostBookmarkByUserAndPost,
      getPost,
      moment,
    });

    const request = {
      context: {
        validated: { ...mock_post_bookmark_data, post: created_post._id },
        user: created_user,
      },
    };

    const result = await countPostBookmarksController(request as any);

    const expected: ExpectSingleResult<IPostBookmark> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
