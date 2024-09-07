import moment from "moment";
import {
  fakePostBookmark,
  fakeQueryParams,
  fakeUser,
} from "../../../../../__tests__/__mock__";
import { ExpectPaginatedResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { readingTimeAnalyzer } from "../../../../../__tests__/reading-time";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPostBookmark from "../../../../database/interfaces/post-bookmark";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeCreatePostBookmark from "../../../../use-cases/post-bookmark/create-post-bookmark";
import makeGetPostBookmarksPaginated from "../../../../use-cases/post-bookmark/get-post-bookmarks-paginated";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCommentDb from "../../../make-comment-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import makeUserDb from "../../../make-user-db";
import { CommentModel, PostBookmarkModel, UserModel } from "../../../models";
import makeGetPostBookmarksPaginatedController from "./get-post-bookmarks-paginated";

describe("getPostBookmarksPaginated", () => {
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
    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createPostBookmark = makeCreatePostBookmark({
      postBookmarkDb,
    });
    const getPostBookmarksPaginated = makeGetPostBookmarksPaginated({
      postBookmarkDb,
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
    const createUser = makeCreateUser({
      userDb,
    });

    const mock_post_bookmark_data = fakePostBookmark();
    const mock_user_data = fakeUser();
    const mock_query_params = fakeQueryParams();

    const [created_user] = await Promise.all([
      createUser(mock_user_data),
      createPostBookmark(mock_post_bookmark_data),
    ]);

    const getPostBookmarksPaginatedController =
      makeGetPostBookmarksPaginatedController({
        getPostBookmarksPaginated,
        countCommentsByPost,
        readingTimeAnalyzer,
      });

    const request = {
      context: {
        validated: mock_query_params,
        user: created_user,
      },
    };

    const result = await getPostBookmarksPaginatedController(request as any);

    const expected: ExpectPaginatedResult<IPostBookmark> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
