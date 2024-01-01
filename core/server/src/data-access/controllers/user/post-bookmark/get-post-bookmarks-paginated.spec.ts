import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectPaginatedResult } from "../../../../../__tests__/__types__/expect-types";
import {
  fakePostBookmark,
  fakeUser,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { readingTimeAnalyzer } from "../../../../../__tests__/reading-time";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCommentDb from "../../../make-comment-db";
import makeUserDb from "../../../make-user-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import PostBookmark from "../../../../database/entities/post-bookmark";
import { PostBookmarkModel, CommentModel, UserModel } from "../../../models";
import makeGetPostBookmarksPaginated from "../../../../use-cases/post-bookmark/get-post-bookmarks-paginated";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeCreatePostBookmark from "../../../../use-cases/post-bookmark/create-post-bookmark";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetPostBookmarksPaginatedController from "./get-post-bookmarks-paginated";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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
    });
    const countCommentsByPost = makeCountCommentsByPost({
      commentDb,
    });
    const getUser = makeGetUser({
      userDb,
    });
    const createUser = makeCreateUser({
      userDb,
    });

    const mock_post_bookmark_data = fakePostBookmark();
    const mock_user_data = fakeUser();
    const mock_query_params = fakeQueryParams();

    const [, created_user] = await Promise.all([
      createPostBookmark({
        postBookmarkDetails: mock_post_bookmark_data,
      }),
      createUser({ userDetails: mock_user_data }),
    ]);

    const getPostBookmarksPaginatedController =
      makeGetPostBookmarksPaginatedController({
        getPostBookmarksPaginated,
        countCommentsByPost,
        readingTimeAnalyzer,
        getUser,
      });

    const request = {
      context: {
        validated: mock_query_params,
        user: created_user,
      },
    };

    const result = await getPostBookmarksPaginatedController(request as any);

    const expected: ExpectPaginatedResult<PostBookmark> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
