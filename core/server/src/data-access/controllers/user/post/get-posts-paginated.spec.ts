import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectPaginatedPartialResult } from "../../../../../__tests__/__types__/expect-types";
import {
  fakePost,
  fakeUser,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { readingTimeAnalyzer } from "../../../../../__tests__/reading-time";
import makePostDb from "../../../make-post-db";
import makeCommentDb from "../../../make-comment-db";
import makeUserDb from "../../../make-user-db";
import makePostBookmarkDb from "../../../make-post-bookmark-db";
import Post from "../../../../database/entities/post";
import {
  PostModel,
  PostBookmarkModel,
  UserModel,
  CommentModel,
} from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPostsPaginated from "../../../../use-cases/post/get-posts-paginated";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetPostBookmarkByUserAndPost from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import makeGetPostsPaginatedController from "./get-posts-paginated";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getPostsPaginated", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains a list of posts entities paginated", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });
    const postBookmarkDb = makePostBookmarkDb({
      postBookmarkDbModel: PostBookmarkModel,
      moment,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });
    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb, logger });
    const getPostsPaginated = makeGetPostsPaginated({ postDb, logger });
    const countCommentsByPost = makeCountCommentsByPost({ commentDb, logger });
    const createUser = makeCreateUser({ userDb, logger });
    const getPostBookmarkByUserAndPost = makeGetPostBookmarkByUserAndPost({
      postBookmarkDb,
      logger,
    });

    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();
    const query_params = fakeQueryParams();

    await createPost({
      postDetails: mock_post_data,
    });

    const created_User = await createUser({
      userDetails: mock_user_data,
    });

    const getPostsPaginatedController = makeGetPostsPaginatedController({
      getPostsPaginated,
      countCommentsByPost,
      getPostBookmarkByUserAndPost,
      readingTimeAnalyzer,
      logger,
    });

    const request = {
      context: {
        validated: {
          ...query_params,
          user_id: created_User._id,
        },
      },
    };

    const result = await getPostsPaginatedController(request as any);

    const expected: ExpectPaginatedPartialResult<Post> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
