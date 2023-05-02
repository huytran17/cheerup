import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakeGallery } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeGalleryDb from "../../../make-gallery-db";
import { GalleryModel } from "../../../models";
import makeCreateGallery from "../../../../use-cases/gallery/create-gallery";
import makeGetGallery from "../../../../use-cases/gallery/get-gallery";
import makeGetGalleriesByParent from "../../../../use-cases/gallery/get-galleries-by-parent";
import makeGetGalleriesByParentController from "./get-galleries-by-parent";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Gallery from "../../../../database/entities/gallery";

describe("getGalleriesByParent", () => {
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
      moment,
    });

    const createGallery = makeCreateGallery({ galleryDb });
    const getGallery = makeGetGallery({ galleryDb, logger });
    const getGalleriesByParent = makeGetGalleriesByParent({
      galleryDb,
      logger,
    });

    const mock_gallery_data = fakeGallery();

    const getGalleriesByParentController = makeGetGalleriesByParentController({
      getGallery,
      getGalleriesByParent,
    });

    const parent_gallery = await createGallery({
      galleryDetails: mock_gallery_data,
    });

    await createGallery({
      galleryDetails: {
        ...fakeGallery(),
        parent: parent_gallery,
      },
    });

    const request = {
      context: {
        validated: parent_gallery,
      },
    };

    const result = await getGalleriesByParentController(request as any);

    const expected: ExpectMultipleResults<Gallery> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
