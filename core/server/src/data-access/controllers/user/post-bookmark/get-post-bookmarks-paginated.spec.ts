import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectPaginatedResult } from "../../../../../__tests__/__types__/expect-types";
import {
  fakePostBookmark,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { readingTimeAnalyzer } from "../../../../../__tests__/reading-time";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import PostBookmark from "../../../../database/entities/post-bookmark";
import { PostBookmarkModel, CommentModel } from "../../../models";
import makeGetPostBookmarksPaginated from "../../../../use-cases/post-bookmark/get-post-bookmarks-paginated";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeCreatePostBookmark from "../../../../use-cases/post-bookmark/create-post-bookmark";
import makeGetPostBookmarksPaginatedController from "./get-post-bookmarks-paginated";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getPostBookmarksPaginated", () => {
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
    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });

    const createPostBookmark = makeCreatePostBookmark({
      postBookmarkDb,
      logger,
    });
    const getPostBookmarksPaginated = makeGetPostBookmarksPaginated({
      postBookmarkDb,
      logger,
    });
    const countCommentsByPost = makeCountCommentsByPost({
      commentDb,
      logger,
    });

    const mock_post_bookmark_data = fakePostBookmark();
    const mock_query_params = fakeQueryParams();

    await createPostBookmark({
      postBookmarkDetails: mock_post_bookmark_data,
    });

    const getPostBookmarksPaginatedController =
      makeGetPostBookmarksPaginatedController({
        getPostBookmarksPaginated,
        countCommentsByPost,
        readingTimeAnalyzer,
        logger,
      });

    const request = {
      context: {
        validated: mock_query_params,
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
