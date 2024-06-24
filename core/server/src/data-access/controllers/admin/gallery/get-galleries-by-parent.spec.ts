import { fakeGallery } from "../../../../../__tests__/__mock__";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IGallery from "../../../../database/interfaces/gallery";
import makeCreateGallery from "../../../../use-cases/gallery/create-gallery";
import makeGetGalleriesByParent from "../../../../use-cases/gallery/get-galleries-by-parent";
import makeGetGallery from "../../../../use-cases/gallery/get-gallery";
import makeGalleryDb from "../../../make-gallery-db";
import { GalleryModel } from "../../../models";
import makeGetGalleriesByParentController from "./get-galleries-by-parent";

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
    });

    const createGallery = makeCreateGallery({ galleryDb });
    const getGallery = makeGetGallery({ galleryDb });
    const getGalleriesByParent = makeGetGalleriesByParent({
      galleryDb,
    });

    const mock_gallery_data = fakeGallery();

    const getGalleriesByParentController = makeGetGalleriesByParentController({
      getGallery,
      getGalleriesByParent,
    });

    const parent_gallery = await createGallery(mock_gallery_data);

    await createGallery({
      ...fakeGallery(),
      parent: parent_gallery,
    });

    const request = {
      context: {
        validated: parent_gallery,
      },
    };

    const result = await getGalleriesByParentController(request as any);

    const expected: ExpectMultipleResults<IGallery> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
