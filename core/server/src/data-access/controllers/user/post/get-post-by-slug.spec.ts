import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePost, fakeUser } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import { readingTimeAnalyzer } from "../../../../../__tests__/reading-time";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import { PostModel, PostBookmarkModel, UserModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetPostBookmarkByUserAndPost from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeGetPostController from "./get-post";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPost from "../../../../database/interfaces/post";

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
    const getPost = makeGetPost({ postDb });
    const getPostBookmarkByUserAndPost = makeGetPostBookmarkByUserAndPost({
      postBookmarkDb,
    });

    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const created_User = await createUser({
      userDetails: mock_user_data,
    });

    const getPostController = makeGetPostController({
      getPost,
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
