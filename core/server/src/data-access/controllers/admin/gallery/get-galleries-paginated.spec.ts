import {
  fakeGallery,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IGallery from "../../../../database/interfaces/gallery";
import makeCreateGallery from "../../../../use-cases/gallery/create-gallery";
import makeGetGalleriesPaginated from "../../../../use-cases/gallery/get-galleries-paginated";
import makeGalleryDb from "../../../make-gallery-db";
import { GalleryModel } from "../../../models";
import makeGetGalleriesPaginatedController from "./get-galleries-paginated";

describe("getGalleriesPaginated", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an array of gallery entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const galleryDb = makeGalleryDb({
      galleryDbModel: GalleryModel,
    });

    const createGallery = makeCreateGallery({ galleryDb });
    const getGalleriesPaginated = makeGetGalleriesPaginated({
      galleryDb,
      randomCacheTime,
      redis,
      logger,
    });

    const mock_gallery_data = fakeGallery();
    const mock_query_params_data = fakeQueryParams();

    await createGallery(mock_gallery_data);

    const getGalleriesPaginatedController = makeGetGalleriesPaginatedController(
      {
        getGalleriesPaginated,
      }
    );

    const request = {
      context: {
        validated: mock_query_params_data,
      },
    };

    const result = await getGalleriesPaginatedController(request as any);

    const expected: ExpectMultipleResults<IGallery> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
