import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeGallery } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeGalleryDb from "../../../make-gallery-db";
import { GalleryModel } from "../../../models";
import makeCreateGallery from "../../../../use-cases/gallery/create-gallery";
import makeGetGallery from "../../../../use-cases/gallery/get-gallery";
import makeHardDeleteGallery from "../../../../use-cases/gallery/hard-delete-gallery";
import makeHardDeleteGalleryController from "./hard-delete-gallery";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IGallery from "../../../../database/interfaces/gallery";

describe("hardDeleteGallery", () => {
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

    const createGallery = makeCreateGallery({ galleryDb });
    const getGallery = makeGetGallery({ galleryDb });
    const hardDeleteGallery = makeHardDeleteGallery({ galleryDb });

    const mock_gallery_data = fakeGallery();

    const created_gallery = await createGallery({
      galleryDetails: mock_gallery_data,
    });

    const hardDeletGalleryController = makeHardDeleteGalleryController({
      getGallery,
      hardDeleteGallery,
      logger,
    });

    const request = {
      context: {
        validated: created_gallery,
      },
    };

    const result = await hardDeletGalleryController(request as any);

    const expected: ExpectSingleResult<IGallery> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
