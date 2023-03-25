import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import {
  fakeGallery,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeGalleryDb from "../../../make-gallery-db";
import { GalleryModel } from "../../../models";
import makeCreateGallery from "../../../../use-cases/gallery/create-gallery";
import makeGetGalleriesPaginated from "../../../../use-cases/gallery/get-galleries-paginated";
import makeGetGalleriesPaginatedController from "./get-galleries-paginated";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Gallery from "../../../../database/entities/gallery";

describe("getGalleriesPaginated", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an array of gallery entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const galleryDb = makeGalleryDb({
      galleryDbModel: GalleryModel,
      moment,
    });

    const createGallery = makeCreateGallery({ galleryDb, logger });
    const getGalleriesPaginated = makeGetGalleriesPaginated({
      galleryDb,
      logger,
    });

    const mock_gallery_data = fakeGallery();
    const mock_query_params_data = fakeQueryParams();

    await createGallery({ galleryDetails: mock_gallery_data });

    const getGalleriesPaginatedController = makeGetGalleriesPaginatedController(
      {
        getGalleriesPaginated,
        logger,
      }
    );

    const request = {
      context: {
        validated: mock_query_params_data,
      },
    };

    const result = await getGalleriesPaginatedController(request as any);

    const expected: ExpectMultipleResults<Gallery> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
