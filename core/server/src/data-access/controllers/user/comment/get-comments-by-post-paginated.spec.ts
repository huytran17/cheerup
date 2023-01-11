import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import {
  fakeComment,
  fakePost,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { ExpectPaginatedEntities } from "../../../../../__tests__/__types__/expect-types";
import Comment from "../../../../database/entities/comment";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import { CommentModel, PostModel } from "../../../models";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetCommentsByPostPaginated from "../../../../use-cases/comment/get-comments-by-post-paginated";
import makeGetCommentsByPostPaginatedController from "./get-comments-by-post-paginated";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getCommentsByPostPaginated", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains pagination data type of comments", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });
    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const getPost = makeGetPost({ postDb, logger });
    const createPost = makeCreatePost({ postDb, logger });
    const createComment = makeCreateComment({ commentDb, logger });
    const getCommentsByPostPaginated = makeGetCommentsByPostPaginated({
      commentDb,
      logger,
    });

    const mock_comment_data = fakeComment();
    const mock_post_data = fakePost();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    await createComment({
      commentDetails: Object.assign(mock_comment_data, {
        post: created_post._id,
      }),
    });

    const getCommentsByPostPaginatedController =
      makeGetCommentsByPostPaginatedController({
        getCommentsByPostPaginated,
        getPost,
        logger,
      });

    const queryParams = fakeQueryParams();

    const request = {
      context: {
        validated: {
          ...queryParams,
          post_id: created_post._id,
        },
      },
    };

    const result = await getCommentsByPostPaginatedController(request as any);

    const expected: ExpectPaginatedEntities<Comment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: {
        ...result.body,
      },
    };

    expect(result).toEqual(expected);
  });
});
