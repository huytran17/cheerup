import moment from "moment";
import { fakePost, fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { readingTimeAnalyzer } from "../../../../../__tests__/reading-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPost from "../../../../database/interfaces/post";
import makeGetPostBookmarkByUserAndPost from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPostBySlug from "../../../../use-cases/post/get-post-by-slug";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import { PostBookmarkModel, PostModel, UserModel } from "../../../models";
import makeGetPostBySlugController from "./get-post-by-slug";

describe("getPostBySlug", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains a post entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });
    const postBookmarkDb = makePostBookmarkDb({
      postBookmarkDbModel: PostBookmarkModel,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb });
    const createUser = makeCreateUser({ userDb });
    const getPostBySlug = makeGetPostBySlug({ postDb });
    const getPostBookmarkByUserAndPost = makeGetPostBookmarkByUserAndPost({
      postBookmarkDb,
    });

    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();

    const [created_post, created_User] = await Promise.all([
      createPost(mock_post_data),
      createUser(mock_user_data),
    ]);

    const getPostController = makeGetPostBySlugController({
      getPostBySlug,
      readingTimeAnalyzer,
      getPostBookmarkByUserAndPost,
    });

    const request = {
      context: {
        validated: {
          ...created_post,
          user_id: created_User._id,
        },
      },
    };

    const result = await getPostController(request as any);

    const expected: ExpectSingleResult<IPost> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
