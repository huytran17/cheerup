import { fakeGallery } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IGallery from "../../../../database/interfaces/gallery";
import makeCreateGallery from "../../../../use-cases/gallery/create-gallery";
import makeGetGallery from "../../../../use-cases/gallery/get-gallery";
import makeGalleryDb from "../../../make-gallery-db";
import { GalleryModel } from "../../../models";
import makeGetGalleryController from "./get-gallery";

describe("getGallery", () => {
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

    const mock_gallery_data = fakeGallery();

    const created_gallery = await createGallery(mock_gallery_data);

    const getGalleryController = makeGetGalleryController({
      getGallery,
    });

    const request = {
      context: {
        validated: created_gallery,
      },
    };

    const result = await getGalleryController(request as any);

    const expected: ExpectSingleResult<IGallery> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
