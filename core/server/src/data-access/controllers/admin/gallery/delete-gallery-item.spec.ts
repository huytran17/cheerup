import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeGallery } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import Storage from "../../../../../__tests__/jest-storage";
import makeGalleryDb from "../../../make-gallery-db";
import { GalleryModel } from "../../../models";
import makeUpdateGallery from "../../../../use-cases/gallery/update-gallery";
import makeGetGallery from "../../../../use-cases/gallery/get-gallery";
import makeCreateGallery from "../../../../use-cases/gallery/create-gallery";
import makeDeleteGalleryItemController from "./delete-gallery-item";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Gallery from "../../../../database/entities/gallery";

describe("deleteGalleryItem", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an gallery entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const galleryDb = makeGalleryDb({
      galleryDbModel: GalleryModel,
      moment,
    });

    const updateGallery = makeUpdateGallery({ galleryDb, logger });
    const createGallery = makeCreateGallery({ galleryDb, logger });
    const getGallery = makeGetGallery({ galleryDb, logger });

    const mock_gallery_data = fakeGallery();

    const created_gallery = await createGallery({
      galleryDetails: mock_gallery_data,
    });

    const deleteGalleryItemController = makeDeleteGalleryItemController({
      getGallery,
      updateGallery,
      storage: Storage,
      logger,
    });

    const request = {
      context: {
        validated: created_gallery,
      },
    };

    const result = await deleteGalleryItemController(request as any);

    const expected: ExpectSingleResult<Gallery> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
