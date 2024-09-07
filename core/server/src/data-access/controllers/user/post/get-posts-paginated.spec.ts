import moment from "moment";
import {
  fakePost,
  fakeQueryParams,
  fakeUser,
} from "../../../../../__tests__/__mock__";
import { ExpectPaginatedPartialResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { readingTimeAnalyzer } from "../../../../../__tests__/reading-time";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPost from "../../../../database/interfaces/post";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeGetPostBookmarkByUserAndPost from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPostsPaginated from "../../../../use-cases/post/get-posts-paginated";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCommentDb from "../../../make-comment-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import {
  CommentModel,
  PostBookmarkModel,
  PostModel,
  UserModel,
} from "../../../models";
import makeGetPostsPaginatedController from "./get-posts-paginated";

describe("getPostsPaginated", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains a list of posts entities paginated", async () => {
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
    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
    });

    const createPost = makeCreatePost({ postDb });
    const getPostsPaginated = makeGetPostsPaginated({
      postDb,
      randomCacheTime,
      redis,
      logger,
    });
    const countCommentsByPost = makeCountCommentsByPost({
      commentDb,
      randomCacheTime,
      redis,
      logger,
    });
    const createUser = makeCreateUser({ userDb });
    const getPostBookmarkByUserAndPost = makeGetPostBookmarkByUserAndPost({
      postBookmarkDb,
    });

    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();
    const query_params = fakeQueryParams();

    const [created_user] = await Promise.all([
      createUser(mock_user_data),
      createPost(mock_post_data),
    ]);

    const getPostsPaginatedController = makeGetPostsPaginatedController({
      getPostsPaginated,
      countCommentsByPost,
      getPostBookmarkByUserAndPost,
      readingTimeAnalyzer,
    });

    const request = {
      context: {
        validated: {
          ...query_params,
          user_id: created_user._id,
        },
      },
    };

    const result = await getPostsPaginatedController(request as any);

    const expected: ExpectPaginatedPartialResult<IPost> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
