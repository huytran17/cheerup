import { Request } from "express";
import { IHardDeleteGallery } from "../../../../use-cases/gallery/hard-delete-gallery";
import _ from "lodash";
import { Logger } from "winston";

export default function makeHardDeleteGalleryController({
  hardDeleteGallery,
  logger,
}: {
  hardDeleteGallery: IHardDeleteGallery;
  logger: Logger;
}) {
  return async function hardDeleteGalleryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { gallery_id } = _.get(httpRequest, "context.validated");
      const exists = await hardDeleteGallery({ _id: gallery_id });

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`Gallery by id ${gallery_id} does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}
