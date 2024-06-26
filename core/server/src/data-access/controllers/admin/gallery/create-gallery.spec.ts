import moment from "moment";
import { fakeGallery, fakeUser } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IGallery from "../../../../database/interfaces/gallery";
import makeCreateGallery from "../../../../use-cases/gallery/create-gallery";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGalleryDb from "../../../make-gallery-db";
import makeUserDb from "../../../make-user-db";
import { GalleryModel, UserModel } from "../../../models";
import makeCreateGalleryController from "./create-gallery";

describe("createGallery", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an gallery entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const galleryDb = makeGalleryDb({
      galleryDbModel: GalleryModel,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createGallery = makeCreateGallery({ galleryDb });
    const createUser = makeCreateUser({ userDb });

    const mock_gallery_data = fakeGallery();
    const mock_user_data = fakeUser();

    const created_user = await createUser(mock_user_data);

    const createGalleryController = makeCreateGalleryController({
      createGallery,
      logger,
    });

    const request = {
      context: {
        validated: mock_gallery_data,
        user: created_user,
      },
    };

    const result = await createGalleryController(request as any);

    const expected: ExpectSingleResult<IGallery> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
