import { Request } from "express";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import { IHardDeleteGallery } from "../../../../use-cases/gallery/hard-delete-gallery";
import _ from "lodash";
import { Logger } from "winston";

export default function makeHardDeleteGalleryController({
  getGallery,
  hardDeleteGallery,
  logger,
}: {
  getGallery: IGetGallery;
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
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getGallery({ _id });

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`Gallery by id ${_id} does not exists`);
      }

      const deleted = await hardDeleteGallery({ _id });

      logger.verbose(`Deleted gallery ${_id} successfully`);

      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}
